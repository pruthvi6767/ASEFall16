package ws.wolfsoft.creative;

/**
 * Created by pruthvirajreddy on 10/5/2016.
 */

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import java.io.ByteArrayOutputStream;

import java.util.List;



public class maps extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    public Geocoder geocoder;
    public Bitmap bitImage;
    public Bitmap resizedBitImage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        //getActionBar().setTitle("Map location");
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        geocoder = new Geocoder(this);
        if (getIntent().hasExtra("imageInfo")){
            bitImage = BitmapFactory.decodeByteArray(
                    getIntent().getByteArrayExtra("imageInfo"), 0, getIntent().getByteArrayExtra("imageInfo").length);
        /*    ByteArrayOutputStream bs = new ByteArrayOutputStream();
            bitImage.compress(Bitmap.CompressFormat.JPEG, 50, bs);
        */
            resizedBitImage = Bitmap.createScaledBitmap(bitImage,68,68,false);
        }




        StringBuilder userAddress = new StringBuilder();
        // Add a marker in Sydney and move the camera
        LocationManager userCurrentLocation = (LocationManager) this
                .getSystemService(Context.LOCATION_SERVICE);
        LocationListener userCurrentLocationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {

            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };
        LatLng userCurrentLocationCorodinates = null;
        double latitute = 0, longitude = 0;
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED && ActivityCompat
                .checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            //show message or ask permissions from the user.
            return;
        }
        //Getting the current location of the user.
        userCurrentLocation.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                0, 0, userCurrentLocationListener);
        latitute = userCurrentLocation
                .getLastKnownLocation(LocationManager.GPS_PROVIDER)
                .getLatitude();
        longitude = userCurrentLocation
                .getLastKnownLocation(LocationManager.GPS_PROVIDER)
                .getLongitude();
        userCurrentLocationCorodinates = new LatLng(latitute,longitude);
        //Getting the address of the user based on latitude and longitude.
        try {
            List<Address> addresses = geocoder.getFromLocation(latitute, longitude, 1);
            Address address = addresses.get(0);
            userAddress =  new StringBuilder();
            for (int i = 0; i < address.getMaxAddressLineIndex(); i++) {
                userAddress.append(address.getAddressLine(i)).append("\t");
            }
            userAddress.append(address.getCountryName()).append("\t");

        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        //Setting our image as the marker icon.
        //mMap.addMarker(new MarkerOptions().position(userCurrentLocationCorodinates)
                //.title("Your current address.").snippet(userAddress.toString())
                //.icon(BitmapDescriptorFactory.fromResource(R.drawable.wemp1)));
        //Setting the zoom level of the map.
        mMap.addMarker(new MarkerOptions().position(new LatLng(latitute, longitude))
                .title("Your current address.")
                .snippet(userAddress.toString())
                .icon(BitmapDescriptorFactory.fromBitmap(resizedBitImage)).anchor(0.5f, 1));
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(userCurrentLocationCorodinates, 7));


    }


}

