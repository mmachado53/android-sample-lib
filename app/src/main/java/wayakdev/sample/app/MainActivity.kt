package wayakdev.sample.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import wayakdev.sample.mylibrary.toastHello

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        toastHello()
    }
}
