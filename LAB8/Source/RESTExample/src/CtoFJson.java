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
 
@Path("/dtoejson")
public class CtoFJson {
	
	Double Euros ;
	Double Dollars;
	
	@GET
	@Produces("application/json")
	  public Response convertDtoE() throws JSONException {

		JSONObject jsonObject = new JSONObject();
		Dollars= 20.0;
		Euros= ((Dollars)*0.92); 
		jsonObject.put("Dollars", Dollars);
		jsonObject.put("Euros", Euros); 
	

		String result = " " + jsonObject;
		return Response.status(200).entity(result).build();
	  }
	@Path("{c}")
	@GET
	@Produces("application/json")
	public Response convertDtoEfromInput(@PathParam("c") Double c) {
		Double Euros ;
		Double Dollars=c;
		JSONObject jsonObject = new JSONObject();
		Euros= ((Dollars)*0.92); 
		jsonObject.put("Dollars", Dollars);
		jsonObject.put("Euros", Euros); 
 
		String result = "" + jsonObject;
		return Response.status(200).entity(result).build();
	}
}