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
 
@Path("/etodjson")
public class FtoCService {
	@GET
	@Produces("application/json")
	  public Response convertDtoE() throws JSONException {

		JSONObject jsonObject = new JSONObject();
		Double Euros=20.0 ;
		Double Dollars;
		Dollars= ((Euros)*1.086); 
		jsonObject.put("Dollars", Dollars);
		jsonObject.put("Euros", Euros); 
	

		String result = " " + jsonObject;
		return Response.status(200).entity(result).build();
	  }
	@Path("{c}")
	@GET
	@Produces("application/json")
	public Response convertCtoFfromInput(@PathParam("c") Double c) {
		Double Euros=c ;
		Double Dollars;
		JSONObject jsonObject = new JSONObject();
		Dollars= ((Euros)*1.086); 
		jsonObject.put("Dollars", Dollars);
		jsonObject.put("Euros", Euros); 
 
		String result = "" + jsonObject;
		return Response.status(200).entity(result).build();
	}
}