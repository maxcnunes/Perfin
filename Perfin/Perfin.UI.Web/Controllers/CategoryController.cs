using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Perfin.UI.Web.Controllers
{
    public class CategoryController : Controller
    {
        //
        // GET: /Category/

        public ActionResult Index()
        {
            return View();
        }


        //
        // GET: /Category/Create

        public ActionResult Create()
        {
            return View();
        }

    }
}
