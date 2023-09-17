package com.example.jhy.military_calendar;


import java.text.DateFormat;
import java.text.ParseException;
import java.util.Calendar;

public class calculate_logic
{
    private static final int total_period=637;
    private static String pc;
    private static int days_leftover;
    private static int days_spent;

    public calculate_logic()
    {


        String dateString = "Jul 23, 2018 10:00 AM";

        // Get the default MEDIUM/SHORT DateFormat
        DateFormat format =
                DateFormat.getDateTimeInstance(
                        DateFormat.MEDIUM, DateFormat.SHORT);
        java.util.Date end=null;
        try {
            end = format.parse(dateString);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }



        java.util.Date today_date=Calendar.getInstance().getTime();


        Calendar td=Calendar.getInstance();
        td.setTime(today_date);
        //System.out.println(today_date);
        int d_l = -1;

        while (td.getTime().before(end)) {
            td.add(Calendar.DATE, 1);
            d_l++;

        }

        this.days_spent=total_period-d_l;
        this.days_leftover=d_l;
        double percent=((double)days_spent/(double)total_period)*100;
        this.pc=String.format("%.2f", percent);

    }

    public String GetPercentage()
    {
        return this.pc;
    }
    public int GetDays_leftover()
    {
        return this.days_leftover;
    }
    public int GetDays_spent()
    {
        return this.days_spent;
    }

}
