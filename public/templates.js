angular.module('Scrbbl').run(['$templateCache', function($templateCache) {$templateCache.put('views/firstVisitMessage.html','<div class="mdl-card mdl-shadow--2dp demo-card-wide">\n\n    <div class="mdl-card__title">\n        <h2 class="mdl-card__title-text">Welcome</h2>\n        <!-- / .mdl-card__title -->\n    </div>\n\n    <div class="mdl-card__supporting-text">\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...\n        <!-- / .mdl-card__supporting-text -->\n    </div>\n\n    <div class="mdl-card__actions mdl-card--border">\n        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Get Started</a>\n        <!-- / .mdl-card__actions mdl-card--border -->\n    </div>\n\n    <div class="mdl-card__menu">\n        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">\n        <i class="material-icons">share</i>\n      </button>\n        <!-- / .mdl-card__menu -->\n    </div>\n\n    <!-- / .mdl-card mdl-shadow--2dp demo-card-wide -->\n</div>\n<hr />\n\n<h2>\u6B63\u65B9\u5F62</h2>\n\n<div class="mdl-card mdl-shadow--2dp demo-card-square">\n\n    <div class="mdl-card__title mdl-card--expand">\n        <h2 class="mdl-card__title-text">Update</h2>\n        <!-- / .mdl-card__title mdl-card--expand -->\n    </div>\n\n    <div class="mdl-card__supporting-text">\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.\n        <!-- / .mdl-card__supporting-text -->\n    </div>\n\n    <div class="mdl-card__actions mdl-card--border">\n        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">View Updates</a>\n        <!-- / .mdl-card__actions mdl-card--border -->\n    </div>\n\n    <!-- / .mdl-card mdl-shadow--2dp demo-card-square -->\n</div>');
$templateCache.put('views/home.html','<div class="jumbotron">\n    <div class="container">\n        <div class="row">\n            <h1 class="main-header">Scrbbl</h1>\n            <div>\n               <h3>Scrbbl is currently under development.</h3> \n               <p>Although functionality may work on some occasions there may be other times where it doesn\'t.</p>\n               <p>The design is also a work in progress and will be improving over the lifecycle of the site\'s development. If you have any suggestions please email me at cw5790@gmail.com</p>\n            </div>\n        </div>\n    </div>\n</div>');
$templateCache.put('views/manual.html','<div class="jumbotron">\n    <div class="container">\n        <div class="alert alert-success alert-dismissible" role="alert" ng-if="success">\n            <button type="button" ng-click="{{success = false}}" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n            <strong>Success</strong> - Track scrobbled successfully.\n        </div>\n\n        <div class="page-header" id="banner">\n            <div class="row">\n                <div class="col-lg-8 col-md-7 col-sm-6">\n                    <form class="form-horizontal" name="manualform" ng-if="!success && !loading">\n                        <fieldset>\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="artistinput">Artist</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.songArtist" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md"\n                                    ng-required="true">\n                                    <span ng-show="manualform.artistinput.$error.required && manualform.artistinput.$touched" style="color:#D32F2F">Track artist is required</span>\n                                </div>\n                            </div>\n\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="songinput">Song Title</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.songTitle" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md"\n                                        ng-required="true">\n                                    <span ng-show="manualform.songinput.$error.required && manualform.songinput.$touched" style="color:#D32F2F">Track title is required</span>\n\n                                </div>\n                            </div>\n\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="albuminput">Album Title</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.albumTitle" id="albuminput" name="albuminput" type="text" placeholder="" class="form-control input-md">\n\n                                </div>\n                            </div>\n\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="albumartistinput">Album Artist</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.albumArtist" id="albumartistinput" name="albumartistinput" type="text" placeholder="" class="form-control input-md">\n\n                                </div>\n                            </div>\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="dateinput">Date (Optional)</label>\n                                <div class="col-md-4">\n                                    <input ng-model="track.datePlayed" id="dateinput" name="dateinput" type="date" placeholder="" class="form-control input-md">\n\n                                </div>\n                                <div class="col-md-4">\n                                    <input ng-model="track.timePlayed" id="timeinput" name="timeinput" type="time" ng-if="track.datePlayed" class="form-control input-md">\n\n                                </div>\n                                <br><br>\n                                <p style="font-size:12px">Date is currently Chrome only unless you want to format it yourself</p>\n                            </div>\n\n                            <!-- Button (Double) -->\n                            <div class="form-group">\n                                <label class="col-md-4 control-label" for="scrobblebutton"></label>\n                                <div class="col-md-8" ng-if="user">\n                                    <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobble()" ng-disabled="manualform.$invalid">Scrobble</button>\n                                    <button id="clearbutton" ng-click="clearForm()" name="clearbutton" class="btn btn-danger">Clear</button>\n                                </div>\n                                <div class="col-md-8" ng-if="!user">\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\n                                </div>\n                            </div>\n\n                        </fieldset>\n                    </form>\n\n\n                    <div ng-if="artistScrobbles">\n                        <p>You have scrobbled {{track.songArtist}} {{artistScrobbles}} times</p>\n                    </div>\n\n                    <div ng-if="success">\n                        <h4 ng-if="success">Track scrobbled successfully</h4>\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\n                    </div>\n                    <div ng-if="loading">\n                        <div class="loader">Loading...</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n    </div>\n</div>');
$templateCache.put('views/scrobblealbum.html','<div class="jumbotron">\n    <div class="container">\n\n        <div class="page-header" id="banner">\n            <div class="row">\n                <div class="col-lg-8 col-md-7 col-sm-6">\n                    <form class="form-horizontal" ng-if="!success && !loading" name="albumform">\n                        <fieldset>\n\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="songinput">Album</label>\n                                <div class="col-md-8">\n                                    <input ng-model="album.title" id="albumsearch" name="albumsearch" type="text" placeholder="" class="form-control input-md" ng-required="true">\n                                    <span ng-show="albumform.albumsearch.$error.required && albumform.albumsearch.$touched" style="color:#D32F2F">Search field required</span>\n                                </div>\n                            </div>\n\n                            <!-- Button (Double) -->\n                            <div class="form-group">\n                                <label class="col-md-4 control-label" for="scrobblebutton"></label>\n                                <div class="col-md-8 buttonsubmit" ng-if="user">\n                                    <button id="searchbutton" name="searchbutton" class="btn btn-primary" ng-click="search()" ng-disabled="albumform.$invalid">Search</button>\n                                </div>\n                                <div class="col-md-8 buttonsubmit" ng-if="!user">\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\n                                </div>\n                            </div>\n\n                        </fieldset>\n                    </form>\n                    <div ng-if="selectedAlbum.artist">\n                        <p>Scrobble {{selectedAlbum.artist}} - {{selectedAlbum.title}}?</p>\n                        <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobbleAlbum()">Scrobble album</button>\n                        <h4 style="margin-top:20px">Edit track tags</h4>\n                    </div>\n                        <div class="col-lg-12 track-edit" ng-if="album.tracks" ng-repeat="track in album.tracks">\n                            <fieldset>\n                            <div class="form-group">\n                                <label class="col-md-2 col-lg-4 control-label" for="artistinput">Artist</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.artistName" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md">\n\n\n                                </div>\n                            </div>\n                            <div class="form-group">\n                                <label class="col-md-2 col-lg-4 control-label" for="songinput">Song Title</label>\n                                <div class="col-md-8">\n                                    <input ng-model="track.trackCensoredName" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md">\n\n                                </div>\n                            </div>\n                        </fieldset>\n\n                        </div>\n                    <div ng-if="success">\n                        <h4 ng-if="success">Album scrobbled successfully</h4>\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\n                    </div>\n                    <div ng-if="loading">\n                        <div class="loader">Loading...</div>\n                    </div>\n\n                </div>\n                <div class="col-lg-4 col-md-5 col-sm-6">\n                    <div class="result col-lg-12" ng-repeat="result in results" ng-click="selectResult(result)">\n                        <div class="col-lg-3">\n                            <img src="{{result.imageUrl}}" alt="{{result.title + \' artwork\'}}" />\n                        </div>\n\n                        <div class="col-lg-9">\n                            <h5>{{result.title}}</h5>\n                            <p style="font-size:10px">{{result.artist}}</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>');
$templateCache.put('views/scrobbleradio.html','<div class="jumbotron">\n    <div class="container">\n\n        <div class="page-header" id="banner">\n            <div class="row">\n                <div class="col-lg-8 col-md-7 col-sm-6">\n                    <form class="form-horizontal">\n                        <fieldset>\n\n                            <!-- Text input-->\n                            <div class="form-group">\n                                <label class="col-md-2 control-label" for="songinput">Station</label>\n                                <div class="col-md-8">\n                                    <select style="width: 80%" ng-change="getStationPlays()"ng-model="selectedStation" \n                                                    ng-options="x.lastfmName as x.station for x in stations"></select>\n\n                                </div>\n                            </div>\n                            <div class="form-group">\n                                <div class="col-md-8 buttonsubmit" ng-if="user">\n                                    <button id="radiobutton" name="radiobutton" class="btn btn-success formbutton" ng-click="scrobbleSelected()">Scrobble selected tracks</button>\n                                </div>\n                                <div class="col-md-8 buttonsubmit" ng-if="!user">\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger formbutton" ng-click="authenticate()">Login with Last.FM</button>\n                                </div>\n                            </div>\n\n                        </fieldset>\n                    </form>\n\n                </div>\n            </div>\n\n            <div class="row">\n                <div class="col-lg-8 col-md-8 radio-track" ng-if="results" ng-repeat="result in results">\n                    <div class="col-lg-1 col-md-1">\n                        <input type="checkbox" ng-model="result.toScrobble">\n                    </div>\n                    <div class="col-lg-7 col-md-7" >\n                        <p id="radio-track-info" style="margin-top:1px; font-weight:400;">{{result.artist}} - {{result.title}}</p>\n                    </div>\n                    <div class="col-lg-3 col-md-3 pull-right">\n                        <p id="radio-track-date" style="margin-top:1px;">{{result.date}}</p>\n                    </div>\n                    \n                </div>\n            </div>\n\n        </div>\n\n\n    </div>\n</div>');
$templateCache.put('views/templates/manualScrobbleForm.html','<form class="form-horizontal" name="manualform" ng-if="!success && !loading">\n    <fieldset>\n        <!-- Text input-->\n        <div class="form-group">\n            <label class="col-md-2 control-label" for="artistinput">Artist</label>\n            <div class="col-md-8">\n                <input ng-model="track.songArtist" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md"\n                    ng-required="true">\n                <span ng-show="(manualform.artistinput.$error.required && manualform.artistinput.$touched)" style="color:#D32F2F">Track artist is required</span>\n            </div>\n\n        </div>\n\n        <!-- Text input-->\n        <div class="form-group">\n            <label class="col-md-2 control-label" for="songinput">Song Title</label>\n            <div class="col-md-8">\n                <input ng-model="track.songTitle" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md"\n                    ng-required="true">\n                <span ng-show="manualform.songinput.$error.required && manualform.songinput.$touched" style="color:#D32F2F">Track title is required</span>\n\n            </div>\n        </div>\n\n        <!-- Text input-->\n        <div class="form-group">\n            <label class="col-md-2 control-label" for="albuminput">Album Title</label>\n            <div class="col-md-8">\n                <input ng-model="track.albumTitle" id="albuminput" name="albuminput" type="text" placeholder="" class="form-control input-md">\n\n            </div>\n        </div>\n\n        <!-- Text input-->\n        <div class="form-group">\n            <label class="col-md-2 control-label" for="albumartistinput">Album Artist</label>\n            <div class="col-md-8">\n                <input ng-model="track.albumArtist" id="albumartistinput" name="albumartistinput" type="text" placeholder="" class="form-control input-md">\n\n            </div>\n        </div>\n        <div class="form-group">\n            <label class="col-md-2 control-label" for="dateinput">Date (Optional)</label>\n            <div class="col-md-4">\n                <input ng-model="track.datePlayed" id="dateinput" name="dateinput" type="date" placeholder="" class="form-control input-md">\n\n            </div>\n            <div class="col-md-4">\n                <input ng-model="track.timePlayed" id="timeinput" name="timeinput" type="time" ng-if="track.datePlayed" class="form-control input-md">\n\n            </div>\n            <br><br>\n            <p style="font-size:12px">Date is currently Chrome only unless you want to format it yourself</p>\n        </div>\n\n        <!-- Button (Double) -->\n        <div class="form-group">\n            <label class="col-md-4 control-label" for="scrobblebutton"></label>\n            <div class="col-md-8" ng-if="user">\n                <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobble()" ng-disabled="manualform.$invalid">Scrobble</button>\n                <button id="clearbutton" ng-click="clearForm()" name="clearbutton" class="btn btn-danger">Clear</button>\n            </div>\n            <div class="col-md-8" ng-if="!user">\n                <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\n            </div>\n        </div>\n\n    </fieldset>\n</form>');}]);