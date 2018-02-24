using System.Collections.Generic;
using System.Xml.Linq;
using DecisionTree.Html.Models;

namespace DecisionTree.Parser
{
    public interface IXmlParser
    {
        List<Node> PrepareNodeList( XElement element );
    }
}
