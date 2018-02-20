using System.Collections.Generic;
using System.Xml.Linq;
using Support.Html.Models;

namespace Support.Parser
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
                var node = new Node
                {
                    Id = element.Attribute("ID").Value,
                    Text = element.Attribute("TEXT").Value,
                    Link = element.Attribute("LINK") != null ? element.Attribute("LINK").Value : "",
                    ParentId = parentElement.Attribute("ID") != null ? parentElement.Attribute("ID").Value : "",
                };

                Nodes.Add(node);
            }

            foreach (XElement childElement in element.Elements())
            {
                ParseXml( childElement, element );
            }
        }
    }
}
