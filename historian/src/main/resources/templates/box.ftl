<div class="row">
    <div class="col-md-3 col-sm-4 col-xs-12">
        <section class="box ">
            <header class="panel_header">
                <h2 class="title pull-left">Sources & Tags</h2>
            </header>
            <div class="content-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="hidden-sm hidden-xs searchform focus">

                        <a data-toggle="modal" href="#ultraModal-4" class="btn btn-default btn-block">Browse sources & tags</a><br>

                        </div>
                    </div>
                </div>
            </div>

            <!-- modal start -->
            <div class="modal fade" id="ultraModal-4" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ultraModal-Label" aria-hidden="true">
                <div class="modal-dialog" style="width: 96%">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">Modal Tittle</h4>
                        </div>
                        <div class="modal-body">

                                <div class="row">
                                        <div class="col-md-12 col-sm-12 col-xs-12">

                                            <form id="commentForm">

                                                <div id="pills"class='wizardpills' >
                                                    <ul class="form-wizard">
                                                        <li><a href="#pills-tab1" data-toggle="tab"><span>Source</span></a></li>
                                                        <li><a href="#pills-tab2" data-toggle="tab"><span>Tags</span></a></li>
                                                    </ul>
                                                    <div id="bar" class="progress active">
                                                        <div class="progress-bar progress-bar-primary " role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                                                    </div>
                                                    <div class="tab-content">
                                                        <div class="tab-pane" id="pills-tab1">
                                                        <ul class="uk-nestable" data-uk-nestable="{maxDepth:1}">
                                                            <li>
                                                                <div class="uk-nestable-item">
                                                                    <div class="uk-nestable-handle"></div>
                                                                    <div data-nestable-action="toggle"></div>
                                                                    <div class="list-label">Source 1</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="uk-nestable-item">
                                                                    <div class="uk-nestable-handle"></div>
                                                                    <div data-nestable-action="toggle"></div>
                                                                    <div class="list-label">Source 2</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="uk-nestable-item">
                                                                    <div class="uk-nestable-handle"></div>
                                                                    <div data-nestable-action="toggle"></div>
                                                                    <div class="list-label">Source 3</div>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                        </div>
                                                        <div class="tab-pane" id="pills-tab2">

                                                        </div>


                                                        <div class="clearfix"></div>

                                                        <ul class="pager wizard">
                                                            <li class="previous"><a href="javascript:;">Previous</a></li>
                                                            <li class="next"><a href="javascript:;">Next</a></li>
                                                            <li class="finish"><a href="javascript:;">Finish</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal end -->
        </section>
        <section class="box ">
            <header class="panel_header">
                <h2 class="title pull-left">Search</h2>
            </header>
            <div class="content-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="hidden-sm hidden-xs searchform focus">
                            <div class="input-group">
                                <span class="input-group-addon input-focus">
                                    <i class="fa fa-search"></i>

                                </span>
                                <form id="query-form" action="plik.html" method="GET">
                                    <input
                                        class="form-control animated fadeIn"
                                        type="text"
                                        id="q"
                                        name="q"
                                        value="$!esc.html($params.get('q'))"
                                        placeholder="*:*"/>
                                    <input type="submit" id="querySubmit"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="box ">
            <header class="panel_header">
                <h2 class="title pull-left">Date range</h2>
            </header>
            <div class="content-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">

                        <div class="notify-toggle-wrapper datetimepicker showopacity">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <span class="arrow"></span>
                                    <i class="fa fa-calendar"></i>
                                </span>
                                <input id="reportrange" type="text" class="form-control pull-left" placeholder="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="box ">
            <header class="panel_header">
                <h2 class="title pull-left">Filters</h2>
            </header>
            <div class="content-body">
                <div class="row">
                    <div class="input-group ">
                        <span class="input-group-addon">
                            <i class="fa fa-filter"></i>
                        </span>
                        <input type="text" value="" id="treedata_q" placeholder="Filter" class="form-control"/>
                    </div>
                    <div id="jstree_treedata" class="treedata" style="min-height:200px;"></div>
                </div>
            </div>
        </section>
    </div>
    <div class="col-md-9 col-sm-8 col-xs-12">
        <div class="">

            <ul class="nav nav-tabs">
                <li>
                    <a href="#tab-table" data-toggle="tab">
                        <i class="fa fa-table"></i>
                        summary <i class="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></i>
                    </a>
                </li>

                <li class="active">
                    <a href="#tab-horizon-chart" data-toggle="tab">
                        <i class="fa fa-area-chart"></i>
                        horizon <i class="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></i>
                    </a>
                </li>

                <li>
                    <a href="#tab-scatterplot" data-toggle="tab">
                        <i class="fa fa-line-chart"></i>
                        scatterplot <i class="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></i>
                    </a>
                </li>

                <li>
                    <a href="#tab-circos" data-toggle="tab">
                        <i class="fa fa-line-chart"></i>
                        circular <i class="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></i>
                    </a>
                </li>
                <li>
                    <a href="#tab-line-charts" data-toggle="tab">
                        <i class="fa fa-line-chart"></i>
                        lines
                    </a>
                </li>

                <li>
                    <a href="#tab-information" data-toggle="tab">
                        <i class="fa fa-info-circle"></i>
                        information <i class="box_setting fa fa-cog" data-toggle="modal" href="#section-settings"></i>
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade in " id="tab-information">
                    <h4>Dataset:
                        <small class="text-primary">http://localhost:8983/solr/chronix/select?indent=on&q=*:*&wt=json</small>
                    </h4>
                    <h4>Last modified:
                        <small class="text-info">12 months ago</small>
                    </h4>
                    <h4>Num Docs:
                        <small class="text-info">182</small>
                    </h4>
                    <h4>Max Doc:
                        <small class="text-info">182</small>
                    </h4>
                    <h4>CWD:
                        <small class="text-info">/opt/solr/server</small>
                    </h4>
                    <h4>Instance:
                        <small class="text-info">/opt/solr/server/solr/chronix</small>
                    </h4>
                    <h4>Data:
                        <small class="text-info">/opt/solr/server/solr/chronix/data</small>
                    </h4>
                    <h4>Index:
                        <small class="text-info">/opt/solr/server/solr/chronix/data/index</small>
                    </h4>
                    <h4>Impl:
                        <small class="text-info">org.apache.solr.core.NRTCachingDirectoryFactory</small>
                    </h4>

                </div>
                <div class="tab-pane fade in active" id="tab-horizon-chart">
                    <div id="graph"/></div>
            </div>
            <div class="tab-pane fade" id="tab-table">

                <table
                    id="example-1"
                    class="table table-striped dt-responsive display"
                    cellspacing="0"
                    width="100%"></table>

            </div>
            <div class="tab-pane fade" id="tab-scatterplot">

                <h4>Radar chart</h4>
                <section class="box ">
                    <div class="content-body" id='simple-metrics'>
                        <div class="row">
                            <div class="col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                <canvas id="radar-chartjs" width="300" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <div class="tab-pane fade" id="tab-line-charts">

                <h4>Line Charts</h4>
                <section class="box ">
                    <div class="content-body"></div>
                    <div class="row" id='line-charts'>
                        <div class="col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                            <canvas id="radar-chartjs" width="300" height="300"></canvas>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col-lg-7 text-center legend'></div>
                        <div class='col-lg-5'></div>
                                <div class='col-lg-12 text-center' id='custom-rollover'></div>
                    </div>
       
                </section>

            </div>
            <div class="tab-pane fade" id="tab-circos">

                <div class="mdl-layout__tab-panel" id="heatmap">
                    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                        <div class="mdl-card mdl-cell mdl-cell--12-col">
                            <div class="mdl-card__supporting-text">
                                <h4>Heatmap</h4>
                                <div id='heatmapChart'></div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </section>

    </div>

</div>

</div>

</div>

</div>


        <!-- General section box modal start -->
        <div class="modal" id="section-settings" tabindex="-1" role="dialog" aria-labelledby="ultraModal-Label" aria-hidden="true">
            <div class="modal-dialog animated bounceInDown">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Section Settings</h4>
                    </div>
                    <div class="modal-body">

                        Body goes here...

                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                        <button class="btn btn-success" type="button">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal end -->
