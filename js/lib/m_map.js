/*
The MIT License (MIT)

Copyright (c) 2015 Nicolas BERTIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

define([
  "lib/m_rdr"
], function(mRDR) {
  
  var _this = {}

  _this.setPlayerLocation = function(loc) {
    var bounds  = {
      lat:  84,
      lng: 180
    }
    // fix location according to bounds
    if (Math.abs(loc.lat) > bounds.lat)
      loc.lat = ((loc.lat > 0) ? +1 : -1) * bounds.lat
    if (Math.abs(loc.lng) > bounds.lng)
      loc.lng = ((loc.lng > 0) ? +1 : -1) * bounds.lng

    _this.trigger("evt-map-set-player-location", loc)
    return loc
  }

  //
  // Called when a zone is updated
  //
  // FIXME: should be Update()
  // FIXME: evt-map-zone-inserted
  // FIXME: evt-map-zone-removed
  _this.RefreshZone = function(zone) {
    if (zone.active) {
      if (zone.visible || mRDR.getReader().canSeeHiddenZones()) {
        _this.trigger("evt-map-insert-zone", zone)
      }
    } else {
      _this.trigger("evt-map-remove-zone", zone)
    }
  }

  _this.Reset = function() {
    _this.trigger("evt-map-reset")
  }

  _this.Start = function(loc) {
    _this.trigger("evt-map-start", _this.setPlayerLocation(loc))
  }

  _this.Create = function() {
   _this.trigger("evt-map-create") 
  }

  // extends module with Backbone Events
  _.extend(_this, Backbone.Events)    
  return _this
});
