/**
 * @author ry6d3
 *
 */
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import javax.net.ssl.HttpsURLConnection;
 
@Path("/ltranslate")
public class Ltranslate {
	@GET
	@Produces("application/json")
	  public Response convertEtoD() throws JSONException {

		String key ="AIzaSyBuTeTJsew8FpCgXM4I8wo9VLe8xElooUY";
	     
	       // public Translate(String apiKey) {
	         //   key = apiKey;
	        //}
	        String text="How are you. I am fine";
	        String to="de";
	        String from="en";
	       
	       
	            StringBuilder result = new StringBuilder();
	            try {
	            	 String Output;
	                String encodedText = URLEncoder.encode(text, "UTF-8");
	                String urlStr = "https://www.googleapis.com/language/translate/v2?key=" + key + "&q=" + encodedText + "&target=" + to + "&source=" + from;
	     
	                URL url = new URL(urlStr);
	     
	                HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	                InputStream stream;
	                if (conn.getResponseCode() == 200) //success
	                {
	                    stream = conn.getInputStream();
	                    //System.out.println(stream);
	                } else
	                    stream = conn.getErrorStream();
	                
	                BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
	                String line;
	                while ((line = reader.readLine()) != null) {
	                    result.append(line);
	                  Output=result.toString();
	                  System.out.println(Output);
	                }
	                System.out.println(result.toString());
	                JsonParser parser = new JsonParser();
	     
	                JsonElement element = parser.parse(result.toString());
	     
	                if (element.isJsonObject()) {
	                    JsonObject obj = element.getAsJsonObject();
	                    if (obj.get("error") == null) {
	                        String translatedText = obj.get("data").getAsJsonObject().
	                        get("translations").getAsJsonArray().
	                        get(0).getAsJsonObject().
	                        get("translatedText").getAsString();
	                        //return 
	                        System.out.println(translatedText);
	                        text = translatedText.toString();
	                    }
	                }
	     
	                if (conn.getResponseCode() != 200) {
	                    System.err.println(result);
	                }
	     
	            } catch (IOException | JsonSyntaxException ex) {
	                System.err.println(ex.getMessage());
	            }
	                 //return null;
	       
	

		String respns = "@Produces(\"application/json\") Output: \n\n English to Denmark Converter Translatedtext: \n\n"+ text ;
		return Response.status(200).entity(respns).build();
	  }

	@Path("{f}")
	  @GET
	  @Produces("application/json")
	  public Response convertFtoCfromInput(@PathParam("f") String f) throws JSONException  {
		
		String key ="AIzaSyBuTeTJsew8FpCgXM4I8wo9VLe8xElooUY";
	     
	       // public Translate(String apiKey) {
	         //   key = apiKey;
	        //}
	        String text= f;
	        String to="de";
	        String from="en";
	       
	       
	            StringBuilder result = new StringBuilder();
	            try {
	            	 String Output;
	                String encodedText = URLEncoder.encode(text, "UTF-8");
	                String urlStr = "https://www.googleapis.com/language/translate/v2?key=" + key + "&q=" + encodedText + "&target=" + to + "&source=" + from;
	     
	                URL url = new URL(urlStr);
	     
	                HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
	                InputStream stream;
	                if (conn.getResponseCode() == 200) //success
	                {
	                    stream = conn.getInputStream();
	                    //System.out.println(stream);
	                } else
	                    stream = conn.getErrorStream();
	                
	                BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
	                String line;
	                while ((line = reader.readLine()) != null) {
	                    result.append(line);
	                  Output=result.toString();
	                  System.out.println(Output);
	                }
	                System.out.println(result.toString());
	                JsonParser parser = new JsonParser();
	     
	                JsonElement element = parser.parse(result.toString());
	     
	                if (element.isJsonObject()) {
	                    JsonObject obj = element.getAsJsonObject();
	                    if (obj.get("error") == null) {
	                        String translatedText = obj.get("data").getAsJsonObject().
	                        get("translations").getAsJsonArray().
	                        get(0).getAsJsonObject().
	                        get("translatedText").getAsString();
	                        //return 
	                        System.out.println(translatedText);
	                        text = translatedText.toString();
	                    }
	                }
	     
	                if (conn.getResponseCode() != 200) {
	                    System.err.println(result);
	                }
	     
	            } catch (IOException | JsonSyntaxException ex) {
	                System.err.println(ex.getMessage());
	            }
	                 //return null;
	       
	

		String respns = "@Produces(\"application/json\") Output: \n\n English to Denmark Converter Translatedtext: \n\n"+ text ;
		return Response.status(200).entity(respns).build();
	}
}