using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Linq;
using Support.Html;
using Support.Html.Models;
using System.Configuration;
using Support.Parser;

namespace Support.Core
{
    class Generator
    {
        private static List<Node> Nodes = new List<Node>();
        private static readonly StringBuilder Html = new StringBuilder();
        private static readonly HtmlBuilder HtmlBuilder = new HtmlBuilder();
        private static readonly XmlParser XmlParser = new XmlParser();

        static void Main(string[] args)
        {
            if (args.Length != 1)
                return;

            try
            {
                var xmlFile = args[ 0 ];
                var rootElement = XElement.Load( xmlFile );
                Nodes = XmlParser.PrepareNodeList( rootElement );
                CreateHtmlFile();
            }
            catch (Exception)
            {
                Console.WriteLine( "Error Parsing XML document" );
                throw;
            }
        }

        private static void CreateHtmlFile()
        {
            Html.AppendLine( HtmlBuilder.PrepareHtml( Nodes ) );
            File.WriteAllText( ConfigurationManager.AppSettings.Get( "htmlFile" ), Html.ToString() );
        }
    }
}
