using System.Collections.Generic;
using System.Configuration;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using Support.Html.Models;

namespace Support.Html
{
    public class HtmlBuilder : IHtmlBuilder
    {
        public string PrepareHtml( List<Node> nodes )
        {
            var model = new NodeModel { Nodes = nodes };
            //var templateManager = new ResolvePathTemplateManager( new[] {@"..\..\..\HtmlBuilder\Templates"} );
            var templateManager = new ResolvePathTemplateManager( new[] {@"\"} );
            var config = new TemplateServiceConfiguration
            {
                TemplateManager = templateManager
            };

            Engine.Razor = RazorEngineService.Create( config );
            return Engine.Razor.RunCompile( ConfigurationManager.AppSettings.Get( "xmlTemplateName" ), null, model );
        }
    }
}