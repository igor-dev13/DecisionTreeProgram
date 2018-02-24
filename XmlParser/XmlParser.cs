using System.Collections.Generic;
using System.Xml.Linq;
using DecisionTree.Html.Models;

namespace DecisionTree.Parser
{
    public class XmlParser : IXmlParser
    {
        private static readonly List<Node> Nodes = new List<Node>();

        public List<Node> PrepareNodeList(XElement element)
        {
            ParseXml( element );
            return Nodes;
        }

        private static void ParseXml(XElement element, XElement parentElement = null)
        {
            if (element.Attribute("ID") != null && element.Attribute("TEXT") != null)
            {
                var label = GetBetween( element.Attribute( "TEXT" ).Value, "{", "}" );
                var text = label.Length > 0
                    ? element.Attribute( "TEXT" ).Value.Remove( 0, label.Length + 2 )
                    : element.Attribute( "TEXT" ).Value;

                var node = new Node
                {
                    Id = element.Attribute( "ID" ).Value,
                    Label = label,
                    Text = text,
                    Link = element.Attribute( "LINK" ) != null ? element.Attribute( "LINK" ).Value : "",
                    ParentId = parentElement.Attribute( "ID" ) != null ? parentElement.Attribute( "ID" ).Value : ""
                };

                Nodes.Add(node);
            }

            foreach (XElement childElement in element.Elements())
            {
                ParseXml( childElement, element );
            }
        }

        private static string GetBetween(string strSource, string strStart, string strEnd)
        {
            if (strSource.Contains(strStart) && strSource.Contains(strEnd))
            {
                var Start = strSource.IndexOf( strStart, 0 ) + strStart.Length;
                var End = strSource.IndexOf( strEnd, Start );
                return strSource.Substring( Start, End - Start );
            }
            return "";
        }
    }
}
