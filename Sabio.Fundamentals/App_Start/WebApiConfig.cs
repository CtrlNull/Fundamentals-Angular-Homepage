﻿using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Sabio.Fundamentals
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //Sabio: we remove the xml serializer to make life easier.
            MediaTypeHeaderValue appXmlType = config.Formatters.XmlFormatter
                .SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;

            //SabioWebApi: this is what transforms all the Json into camelcase for us
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

        }
    }
}
