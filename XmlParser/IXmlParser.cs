using System.Collections.Generic;
using System.Xml.Linq;
using Support.Html.Models;

namespace Support.Parser
{
    public interface IXmlParser
    {
        List<Node> PrepareNodeList( XElement element );
    }
}
