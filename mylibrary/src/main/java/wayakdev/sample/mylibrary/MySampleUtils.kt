package wayakdev.sample.mylibrary

import android.app.Activity
import android.widget.Toast

fun Activity.toastHello(){
    Toast.makeText(this, "Hello :) !!", Toast.LENGTH_LONG).show()
}