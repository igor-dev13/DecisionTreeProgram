using System.Collections.Generic;
using Support.Html.Models;

namespace Support.Html
{
    public interface IHtmlBuilder
    {
        string PrepareHtml( List<Node> nodes );
    }
}
