package com.daycare.daycareteacher.utill;

import android.content.ContentUris;
import android.content.Context;
import android.content.ContextWrapper;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;


public class ImageUtils {

	public static void CopyStream(InputStream is, OutputStream os) {
		final int buffer_size = 1024;
		try {
			byte[] bytes = new byte[buffer_size];
			for (;;) {
				int count = is.read(bytes, 0, buffer_size);
				if (count == -1)
					break;
				os.write(bytes, 0, count);
			}
		} catch (Exception ex) {
			Log.e("Utils", "Inside exception -> " + ex.toString());
		}
	}



	public static Bitmap getBitmap(Context context, String tag, Uri url) {
		File cacheDir;
		// if the device has an SD card
		if (Environment.getExternalStorageState().equals(
				Environment.MEDIA_MOUNTED)) {
			cacheDir = new File(
					Environment.getExternalStorageDirectory(),
					".OCFL311");
		} else {
			// it does not have an SD card
			cacheDir = context.getCacheDir();
		}
		if (!cacheDir.exists())
			cacheDir.mkdirs();

		File f = new File(cacheDir, tag);

		try {
			InputStream is = null;
			if (url.toString().startsWith(
					"content://com.google.android.gallery3d")) {
				is = context.getContentResolver().openInputStream(url);
			} else if (url.toString().startsWith(
					"content://com.google.android.apps.photos.content")) {
				is = context.getContentResolver().openInputStream(url);
			} else {
				is = new URL(url.toString()).openStream();
			}
			OutputStream os = new FileOutputStream(f);
			CopyStream(is, os);
			os.close();
			return decodeFile(f);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	public static Bitmap decodeFile(File f) {
		Bitmap outBitmap = null;
		try {
			BitmapFactory.Options options = new BitmapFactory.Options();
			options.inPreferredConfig = Config.ARGB_8888;
			try {
				outBitmap = BitmapFactory.decodeStream(new FileInputStream(f),
						null, options);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return outBitmap;
	}

	public static Bitmap getRoundedBitmap(Bitmap bitmap) {
		if (bitmap == null) {
			return null;
		}

		BitmapFactory.Options opts = new BitmapFactory.Options();
		opts.inDither = false;
		opts.inSampleSize = 1;
		opts.inPurgeable = true;
		opts.inInputShareable = true;
		opts.inTempStorage = new byte[16 * 1024];

		final Bitmap output = Bitmap.createBitmap(bitmap.getWidth(),
				bitmap.getHeight(), Config.ARGB_8888);

		final Canvas canvas = new Canvas(output);

		final int color = Color.RED;
		final Paint paint = new Paint();
		final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
		// final Rect rect1 = new Rect(0, 0, imageView.getWidth(),
		// imageView.getHeight());
		final RectF rectF = new RectF(rect);

		paint.setAntiAlias(true);
		canvas.drawARGB(0, 0, 0, 0);
		paint.setColor(color);
		canvas.drawOval(rectF, paint);

		paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
		canvas.drawBitmap(bitmap, rect, rect, paint);

		bitmap.recycle();

		return output;
	}


	public static Bitmap decodeSampledBitmapFromResource(String picturePath,
			int reqWidth, int reqHeight) {
		final BitmapFactory.Options options = new BitmapFactory.Options();
		try {
			options.inJustDecodeBounds = true;
			options.inTempStorage = new byte[1024 * 1024];
			BitmapFactory.decodeFile(picturePath, options);
			options.inSampleSize = calculateInSampleSize(options, reqWidth,
					reqHeight);
			options.inJustDecodeBounds = false;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return BitmapFactory.decodeFile(picturePath, options);
	}

	public static int calculateInSampleSize(BitmapFactory.Options options,
			int reqWidth, int reqHeight) {
		int inSampleSize = 1;
		try {
			// Raw height and width of image
			final int height = options.outHeight;
			final int width = options.outWidth;

			if (height > reqHeight || width > reqWidth) {

				// Calculate ratios of height and width to requested height and
				// width
				final int heightRatio = Math.round((float) height
						/ (float) reqHeight);
				final int widthRatio = Math.round((float) width
						/ (float) reqWidth);
				inSampleSize = heightRatio < widthRatio ? heightRatio
						: widthRatio;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return inSampleSize;
	}

	public static Bitmap getBitmapFromDrawable(Drawable drawable) {
		Bitmap bitmap = null;
		try {
			if (drawable instanceof BitmapDrawable) {
				bitmap = ((BitmapDrawable) drawable).getBitmap();
			} else {
				bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(),
						drawable.getIntrinsicHeight(), Config.ARGB_8888);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bitmap;
	}

	@SuppressWarnings("deprecation")
	public static void setBackGroundDrawable(View view, Drawable drawable) {
		try {
			if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
				view.setBackgroundDrawable(drawable);
			} else {
				view.setBackground(drawable);
			}
			try {
				((ImageView) view).setImageDrawable(null);
			} catch (Exception e) {

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void setBitmapToView(Bitmap mp, ImageView image) {
		mp = getRoundedBitmap(mp);
		setBackGroundDrawable(image, null);
		if (mp != null) {
			image.setImageBitmap(mp);
		}
	}

	public static File getZifFileName(Context context, String extension) {
		ContextWrapper contextWrapper = new ContextWrapper(context);
		File directory = contextWrapper.getDir("DayCare", Context.MODE_PRIVATE);
		if (!directory.exists() && !directory.mkdirs()) {
			Log.e("ImageSaver", "Error creating directory " + directory);
		}
		String fileName = System.currentTimeMillis() + "." + extension;
		File file = new File(directory, fileName);
		return file;
	}

	public static Bitmap rotateImage(Context context, String photoPath) {
		try {

			DisplayMetrics metrix = context.getResources().getDisplayMetrics();

			ExifInterface ei = new ExifInterface(photoPath);
			int orientation = ei.getAttributeInt(ExifInterface.TAG_ORIENTATION,
					ExifInterface.ORIENTATION_NORMAL);

			BitmapFactory.Options opts = new BitmapFactory.Options();
			opts.inDither = false;
			opts.inSampleSize = 1;
			opts.inPurgeable = true;
			opts.inInputShareable = true;
			opts.inTempStorage = new byte[16 * 1024];

			Bitmap bmp = BitmapFactory.decodeFile(photoPath, opts);
			if (bmp == null) {
				return null;
			}

//			bmp = Bitmap.createScaledBitmap(bmp,
//					(int) (metrix.widthPixels / 1.4f), metrix.heightPixels / 2,
//					true);
			switch (orientation) {
			case ExifInterface.ORIENTATION_ROTATE_90:
				bmp = RotateBitmap(bmp, 90);
				break;
			case ExifInterface.ORIENTATION_ROTATE_180:
				bmp = RotateBitmap(bmp, 180);
				break;
			case ExifInterface.ORIENTATION_ROTATE_270:
				bmp = RotateBitmap(bmp, 270);
				break;
			}

			File f = new File(photoPath);
			if (f.exists()) {
				f.delete();
			}

			ByteArrayOutputStream bytes = new ByteArrayOutputStream();
			bmp.compress(CompressFormat.JPEG, 100, bytes);

			File ff = new File(photoPath);
			try {
				ff.createNewFile();
				FileOutputStream fo = new FileOutputStream(ff);
				fo.write(bytes.toByteArray());
				fo.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return bmp;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Bitmap RotateBitmap(Bitmap source, float angle) {
		Matrix matrix = new Matrix();
		matrix.postRotate(angle);
		return Bitmap.createBitmap(source, 0, 0, source.getWidth(),
				source.getHeight(), matrix, true);
	}


//    public static String getReduceImage( String picturePath,Context context) {
//        try {
//            if (picturePath == null || picturePath.equals("")) {
//                return "";
//            }
//            int toSample = 1;
//            Bitmap testBitmap = BitmapFactory.decodeFile(picturePath);
//            int imageWidth = testBitmap.getWidth();
//            if (imageWidth > 700 && imageWidth < 1500) {
//                toSample = 2;
//            } else if (imageWidth > 1500 && imageWidth < 2500) {
//                toSample = 3;
//            }
//            else if (imageWidth > 2500 && imageWidth < 4500) {
//                toSample = 4;
//            }
//
//            else if (imageWidth > 4500&&imageWidth < 6500) {
//                toSample = 4;
//            }
//
//            else if (imageWidth > 6500) {
//                toSample = 6;
//            }
//
//            BitmapFactory.Options opts = new BitmapFactory.Options();
//            opts.inDither = false;
//            opts.inSampleSize = toSample;
//            opts.inPurgeable = true;
//            opts.inInputShareable = true;
//            opts.inTempStorage = new byte[16 * 1024];
//
//
//            ExifInterface exif = new ExifInterface(picturePath);
//            int orientation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, 1);
//
//
//            Bitmap scaledBitmap = BitmapFactory.decodeFile(picturePath, opts);
//            int ws=scaledBitmap.getWidth();
//            scaledBitmap = getRotation(scaledBitmap, orientation);
//
//
//
//			FileOutputStream out = null;
//			String filename = getFilename(context);
//			try {
//				out = new FileOutputStream(filename);
//				scaledBitmap.compress(CompressFormat.JPEG, 100, out);
//
//			} catch (FileNotFoundException e) {
//				e.printStackTrace();
//			}
//
//			return filename;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return "";
//    }



//	public static String getFilename(Context context) {
//		ContextWrapper contextWrapper = new ContextWrapper(context);
//		File directory = contextWrapper.getDir(Constant.IMAGE_FOLDER_NAME, Context.MODE_PRIVATE);
//		if(!directory.exists() && !directory.mkdirs()){
//			Log.e("ImageSaver","Error creating directory " + directory);
//		}
//		String fileName=System.currentTimeMillis() + ".jpg";
//		File file=new File(directory,fileName);
//		return file.getAbsolutePath();
//	}



    public static byte[] getByteFromBitmap( Bitmap bitmap){

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(CompressFormat.JPEG, 100,
                byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        return byteArray;
    }

    public static Bitmap getScaledBitmapFromPath(Context context, String picturePath) {
        try {
            if (picturePath == null || picturePath.equals("")) {
                return null;
            }
            int toSample = 1;
            Bitmap testBitmap = BitmapFactory.decodeFile(picturePath);
            int imageWidth = testBitmap.getWidth();
            if (imageWidth > 700 && imageWidth < 1500) {

                toSample = 2;
            } else if (imageWidth > 1500 && imageWidth < 2500) {

                toSample = 4;
            }
            else if (imageWidth > 2500 && imageWidth < 4500) {

                toSample = 6;
            }

            else if (imageWidth > 4500&&imageWidth < 6500) {

                toSample = 8;
            }

            else if (imageWidth > 6500) {

                toSample = 10;
            }

            DisplayMetrics metrix = context.getResources().getDisplayMetrics();

            BitmapFactory.Options opts = new BitmapFactory.Options();
            opts.inDither = false;
            opts.inSampleSize = toSample;
            opts.inPurgeable = true;
            opts.inInputShareable = true;
            opts.inTempStorage = new byte[16 * 1024];


            ExifInterface exif = new ExifInterface(picturePath);
            int orientation = exif.getAttributeInt(
                    ExifInterface.TAG_ORIENTATION, 1);

            Bitmap scaledBitmap = BitmapFactory.decodeFile(picturePath, opts);
            int ws=scaledBitmap.getWidth();
            scaledBitmap = getRotation(scaledBitmap, orientation);


return scaledBitmap;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



    public static Bitmap getRotation(Bitmap bitmap, int orientation) {

        try {

            Log.e(orientation + "", "Image orientation >>>>>> " + orientation);
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    bitmap = rotate(bitmap, 90);
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    bitmap = rotate(bitmap, 180);
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    bitmap = rotate(bitmap, 270);
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return bitmap;
    }

    public static Bitmap rotate(Bitmap b, int degrees) {
        if (degrees != 0 && b != null) {
            Matrix m = new Matrix();
            m.setRotate(degrees, (float) b.getWidth() / 2,
                    (float) b.getHeight() / 2);
            try {
                Bitmap b2 = Bitmap.createBitmap(b, 0, 0, b.getWidth(),
                        b.getHeight(), m, true);
                if (b != b2) {
                    b.recycle();
                    b = b2;
                }
            } catch (OutOfMemoryError ex) {
                // We have no memory to rotate. Return the original bitmap.
                // Log.d("TEST", "no memory to rotate the bitmap");
            }
        }
        return b;
    }














    public static String getRealPathFromURI(final Context context, final Uri uri) {

        DocumentsContract.isDocumentUri(context,uri);

        final boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;

        // DocumentProvider
        if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
            // ExternalStorageProvider
            if (isExternalStorageDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                if ("primary".equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + "/" + split[1];
                }

                // TODO handle non-primary volumes
            }
            // DownloadsProvider
            else if (isDownloadsDocument(uri)) {

                final String id = DocumentsContract.getDocumentId(uri);
                final Uri contentUri = ContentUris.withAppendedId(
                        Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));

                return getDataColumn(context, contentUri, null, null);
            }
            // MediaProvider
            else if (isMediaDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                Uri contentUri = null;
                if ("image".equals(type)) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if ("video".equals(type)) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if ("audio".equals(type)) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }

                final String selection = "_id=?";
                final String[] selectionArgs = new String[] {
                        split[1]
                };

                return getDataColumn(context, contentUri, selection, selectionArgs);
            }
        }
        // MediaStore (and general)
        else if ("content".equalsIgnoreCase(uri.getScheme())) {

            // Return the remote address
            if (isGooglePhotosUri(uri))
                return uri.getLastPathSegment();

            return getDataColumn(context, uri, null, null);
        }
        // File
        else if ("file".equalsIgnoreCase(uri.getScheme())) {
            return uri.getPath();
        }

        return null;
    }

    public static String getDataColumn(Context context, Uri uri, String selection,
                                       String[] selectionArgs) {

        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {
                column
        };

        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs,
                    null);
            if (cursor != null && cursor.moveToFirst()) {
                final int index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is ExternalStorageProvider.
     */
    public static boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is DownloadsProvider.
     */
    public static boolean isDownloadsDocument(Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is MediaProvider.
     */
    public static boolean isMediaDocument(Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is Google Photos.
     */
    public static boolean isGooglePhotosUri(Uri uri) {
        return "com.google.android.apps.photos.content".equals(uri.getAuthority());
    }

}
