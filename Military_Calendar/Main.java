package com.example.jhy.military_calendar;

import android.graphics.drawable.Drawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private calculate_logic cl;
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        cl=new calculate_logic();

        TextView progress_view = (TextView)findViewById(R.id.percent_show);
        progress_view.setText(cl.GetPercentage());

        ProgressBar progress_spent=(ProgressBar) findViewById(R.id.progress_military);
        int pg=Integer.parseInt(cl.GetPercentage());





    }

}
