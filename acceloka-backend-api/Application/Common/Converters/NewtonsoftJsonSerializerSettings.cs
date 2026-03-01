using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

public static class NewtonsoftJsonSerializerSettings
{
    public static JsonSerializerSettings AccelokaDefaultJsonSerializerSettings()
    {
        return new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
            TypeNameHandling = TypeNameHandling.None,
            Formatting = Formatting.None,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        };
    }
}