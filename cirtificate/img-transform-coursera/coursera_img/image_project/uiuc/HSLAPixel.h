/**
 * @file HSLAPixel.h
 *
 * @author University of Illinois CS 225 Course Staff
 * @version 2018r1-lab1 - Updated for CS 400
 */

#pragma once

#include <iostream>
#include <sstream>

namespace uiuc {

  // Put your HSLAPixel class definition here.
  // (Remember to end it with a semicolon!)
class HSLAPixel {
  public:
    double h;
    double s;
    double l;
    double a;

    HSLAPixel(double h, double s, double l=1.0, double a=1.0):h(h),s(s),l(l),a(a) {}
    HSLAPixel():HSLAPixel(1.0,1.0,1.0,1.0){}
};

}
