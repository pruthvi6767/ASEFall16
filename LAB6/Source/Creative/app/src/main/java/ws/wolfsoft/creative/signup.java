package ws.wolfsoft.creative;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.CursorLoader;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Typeface;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Locale;


public class signup extends AppCompatActivity {

    TextView signinhere;
    Typeface fonts1;

    ImageButton imageB;
    private static final int REQUEST_CAMERA = 100;
    private static final int SELECT_FILE = 200;
    private final int REQUEST_PERMISSION_COARSE_LOCATION=1;
    public Bitmap bm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.signup);


        imageB = (ImageButton) findViewById(R.id.image);
        signinhere = (TextView) findViewById(R.id.signinhere);
        ImageButton locbutton = (ImageButton) findViewById(R.id.button);

        TextView signup1= (TextView) findViewById(R.id.signup1);

        signup1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Bitmap checkImage = BitmapFactory.decodeResource(getResources(), R.drawable.slogo);
                Intent it = new Intent(signup.this, maps.class);
                ByteArrayOutputStream bs = new ByteArrayOutputStream();
                         bm.compress(Bitmap.CompressFormat.JPEG, 50, bs);
                it.putExtra("imageInfo", bs.toByteArray());
                startActivity(it);
            }
        });
        signinhere.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent it = new Intent(signup.this, signin.class);
                startActivity(it);
            }
        });

        fonts1 = Typeface.createFromAsset(signup.this.getAssets(),"fonts/Lato-Regular.ttf");
        TextView t1 = (TextView) findViewById(R.id.signinhere);
        t1.setTypeface(fonts1);
    }

    public void selectImage(View v) {
        final CharSequence[] items = {"Use Camera", "Browse Gallery", "Cancel"};
        AlertDialog.Builder builder = new AlertDialog.Builder(signup.this);
        builder.setTitle("Options");
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals("Use Camera")) {
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(intent, REQUEST_CAMERA);
                } else if (items[item].equals("Browse Gallery")) {
                    Intent intent = new Intent(
                            Intent.ACTION_PICK,
                            android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    intent.setType("image/*");
                    startActivityForResult(
                            Intent.createChooser(intent, "Select File"),
                            SELECT_FILE);
                } else if (items[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == REQUEST_CAMERA) {
                bm = (Bitmap) data.getExtras().get("data");
                ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                bm.compress(Bitmap.CompressFormat.JPEG, 90, bytes);
                File image = new File(Environment.getExternalStorageDirectory(),
                        System.currentTimeMillis() + ".jpg");
                FileOutputStream fo;
                try {
                    image.createNewFile();
                    fo = new FileOutputStream(image);
                    fo.write(bytes.toByteArray());
                    fo.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                imageB.setImageBitmap(bm);
            } else if (requestCode == SELECT_FILE) {
                Uri imageURI = data.getData();
                String[] gallery = {MediaStore.MediaColumns.DATA};
                CursorLoader cursorLoader = new CursorLoader(this, imageURI, gallery, null, null,
                        null);
                Cursor cursor = cursorLoader.loadInBackground();
                int col_index = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATA);
                cursor.moveToFirst();
                String imagePath = cursor.getString(col_index);

                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inJustDecodeBounds = true;
                BitmapFactory.decodeFile(imagePath, options);
                final int REQUIRED_SIZE = 200;
                int scale = 1;
                while (options.outWidth / scale / 2 >= REQUIRED_SIZE
                        && options.outHeight / scale / 2 >= REQUIRED_SIZE)
                    scale *= 2;
                options.inSampleSize = scale;
                options.inJustDecodeBounds = false;
                Bitmap bm = BitmapFactory.decodeFile(imagePath, options);

                imageB.setImageBitmap(bm);
            }
        }
    }

    public void getLocation(View v) {

        LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Location location;
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, REQUEST_PERMISSION_COARSE_LOCATION);
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }


        location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        //if (location!=null) {
            double longitude = location.getLongitude();
            double latitude = location.getLatitude();
            String locLat = String.valueOf(latitude) + "," + String.valueOf(longitude);

            Geocoder geocoder = new Geocoder(signup.this, Locale.getDefault());
            TextView loc = (TextView) findViewById(R.id.location);
            String result;
            try {

                List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
                Log.e("Addresses", "-->" + addresses);
                result = addresses.get(0).getAddressLine(0)+"\n"+addresses.get(0).getAddressLine(1)
                +"\n"+addresses.get(0).getAddressLine(2);
                System.out.println("" + result);
                loc.setText(result);
            } catch (IOException e) {
                e.printStackTrace();
            }
        //}
    }
}
