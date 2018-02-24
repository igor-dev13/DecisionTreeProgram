using System.Collections.Generic;
using DecisionTree.Html.Models;

namespace DecisionTree.Html
{
    public interface IHtmlBuilder
    {
        string PrepareHtml( List<Node> nodes );
    }
}
