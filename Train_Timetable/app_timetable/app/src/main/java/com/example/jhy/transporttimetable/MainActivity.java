package com.example.jhy.transporttimetable;

import android.os.AsyncTask;
import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {

    private TextView tv;
    private String result;
    private doit di;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tv=(TextView)findViewById(R.id.textview);


        new CountDownTimer(60000000, 1000){
            public void onTick(long millisUntilFinished){
                di=new doit();
                di.execute();
            }
            public  void onFinish(){
            }
        }.start();



    }

    public class doit extends AsyncTask<Void, Void, Void> {
        String data;
        //private Map<String, String> trans = new HashMap<>();



        @Override
        protected Void doInBackground(Void... voids) {

            try {
                URL url=new URL("https://jp.translink.com.au/plan-your-journey/stops/runcorn-station");
                HttpURLConnection httpURLConnection=(HttpURLConnection) url.openConnection();
                InputStream inputStream=httpURLConnection.getInputStream();
                BufferedReader bufferedReader=new BufferedReader((new InputStreamReader(inputStream)));
                String line="";
                while(line!=null)
                {
                    line=bufferedReader.readLine();
                    data=data+line;
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }
        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);

            Set<Integer> trans=new HashSet();

            Pattern pattern = Pattern.compile("<span class=\"sr-only\" aria-hidden=\"false\">([^<]*)</span>");
            Matcher matcher = pattern.matcher(data);

            String str="";
            while(matcher.find())
            {


                if(matcher.group(1).contains("BNFG") || matcher.group(1).contains("BNBR"))
                {
                    str=matcher.group(1);
                    String[] splited = str.split("\\s+");

                    //trans.put(splited[3], splited[1]);
                    if(!splited[3].contains(":"))
                    {
                        trans.add(Integer.parseInt(splited[3]));

                    }


                }



            }
            List transList = new ArrayList(trans);
            Collections.sort(transList);
            tv.setText(transList.toString());


        }


    }

}








