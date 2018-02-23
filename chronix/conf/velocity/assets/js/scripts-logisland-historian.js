/**
logisland historian js
 */


jQuery(function($) {

    'use strict';

    var ULTRA_SETTINGS = window.ULTRA_SETTINGS || {};


    /*--------------------------------
         Top Bar
     --------------------------------*/
    ULTRA_SETTINGS.pageTopBar = function() {
        $('.page-topbar li.searchform .input-group-addon').click(function(e) {
            $(this).parent().parent().toggleClass("focus");
            $(this).parent().find("input").focus();
        });

        $('.page-topbar li .dropdown-menu .list').perfectScrollbar({
            suppressScrollX: true
        });

    };

    /*--------------------------------
         Window Based Layout
     --------------------------------*/
    ULTRA_SETTINGS.onLoadTopBar = function() {

            $(".page-topbar .message-toggle-wrapper").addClass("showopacity");
            $(".page-topbar .notify-toggle-wrapper").addClass("showopacity");
            $(".page-topbar .searchform").addClass("showopacity");
            $(".page-topbar li.profile").addClass("showopacity");
    }
    /*--------------------------------
        Viewport Checker
     --------------------------------*/
    ULTRA_SETTINGS.viewportElement = function() {

        if ($.isFunction($.fn.viewportChecker)) {

            $('.inviewport').viewportChecker({
                callbackFunction: function(elem, action) {
                    //setTimeout(function(){
                    //elem.html((action == "add") ? 'Callback with 500ms timeout: added class' : 'Callback with 500ms timeout: removed class');
                    //},500);
                }
            });


            $('.number_counter').viewportChecker({
                classToAdd: 'start_timer',
                offset: 10,
                callbackFunction: function(elem) {
                    $('.start_timer:not(.counted)').each(count);
                    //$(elem).removeClass('number_counter');
                }
            });

        }

        // start count
        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options).addClass("counted");
        }
    };

    /*--------------------------------
        Sortable / Draggable Panels
     --------------------------------*/
    ULTRA_SETTINGS.draggablePanels = function() {

        if ($.isFunction($.fn.sortable)) {
            $(".sort_panel").sortable({
                connectWith: ".sort_panel",
                handle: "header.panel_header",
                cancel: ".panel_actions",
                placeholder: "portlet-placeholder"
            });
        }
    };

    /*--------------------------------
         Section Box Actions
     --------------------------------*/
    ULTRA_SETTINGS.sectionBoxActions = function() {

        $('section.box .actions .box_toggle').on('click', function() {

            var content = $(this).parent().parent().parent().find(".content-body");
            if (content.hasClass("collapsed")) {
                content.removeClass("collapsed").slideDown(500);
                $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            } else {
                content.addClass("collapsed").slideUp(500);
                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }

        });

        $('section.box .actions .box_close').on('click', function() {
            content = $(this).parent().parent().parent().remove();
        });



    };

    /*--------------------------------
         Login Page
     --------------------------------*/
    ULTRA_SETTINGS.loginPage = function() {

        var height = window.innerHeight;
        var formheight = $("#login").height();
        var newheight = (height - formheight) / 2;
        //console.log(height+" - "+ formheight + " / "+ newheight);
        $('#login').css('margin-top', +newheight + 'px');

        if ($('#login #user_login').length) {
            var d = document.getElementById('user_login');
            d.focus();
        }

    };

    /*--------------------------------
         js tree
     --------------------------------*/
    ULTRA_SETTINGS.jsTreeINIT = function() {


        if ($.isFunction($.fn.jstree)) {
            $(function() {
                var to = false;
                $('#treedata_q').keyup(function() {
                    if (to) {
                        clearTimeout(to);
                    }
                    to = setTimeout(function() {
                        var v = $('#treedata_q').val();
                        $('#jstree_treedata').jstree(true).search(v);
                    }, 250);
                });

                $('#jstree_treedata')
                    .jstree({
                        "core": {
                            "animation": 0,
                            "check_callback": true,
                            "themes": {
                                "stripes": true
                            },
                            'data': {
                                'url': function(node) {
                                    return node.id === '#' ? 'data/ajax_demo_roots_jstree-logisland.json' : 'data/ajax_demo_children_jstree.json';
                                },
                                'data': function(node) {
                                    return {
                                        'id': node.id
                                    };
                                }
                            }
                        },
                        "types": {
                            "#": {
                                "max_children": 1,
                                "max_depth": 4,
                                "valid_children": ["root"]
                            },
                            "default": {
                                "valid_children": ["default", "file"]
                            },
                            "file": {
                                "icon": "fa fa-file",
                                "valid_children": []
                            }
                        },
                        // "plugins": ["checkbox", "contextmenu", "dnd", "search", "sort", "state", "types", "unique", "wholerow"]
                        "plugins": ["dnd", "search", "sort", "state", "types", "unique", "wholerow"]
                    });
            });

        }
    };

    /*--------------------------------
         DataTables
     --------------------------------*/
    ULTRA_SETTINGS.dataTablesInit = function() {

        if ($.isFunction($.fn.dataTable)) {

            /*--- start ---*/

            $("#example-1").dataTable({
                responsive: true,
                aLengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ]
            });

            /*--- end ---*/

            /*--- start ---*/

            $('#example-4').dataTable();

            /*--- end ---*/



            /* Set the defaults for DataTables initialisation */
            $.extend(true, $.fn.dataTable.defaults, {
                "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_"
                }
            });


            /* Default class modification */
            $.extend($.fn.dataTableExt.oStdClasses, {
                "sWrapper": "dataTables_wrapper form-inline"
            });


            /* API method to get paging information */
            $.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
                return {
                    "iStart": oSettings._iDisplayStart,
                    "iEnd": oSettings.fnDisplayEnd(),
                    "iLength": oSettings._iDisplayLength,
                    "iTotal": oSettings.fnRecordsTotal(),
                    "iFilteredTotal": oSettings.fnRecordsDisplay(),
                    "iPage": oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
                    "iTotalPages": oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
                };
            };


            /* Bootstrap style pagination control */
            $.extend($.fn.dataTableExt.oPagination, {
                "bootstrap": {
                    "fnInit": function(oSettings, nPaging, fnDraw) {
                        var oLang = oSettings.oLanguage.oPaginate;
                        var fnClickHandler = function(e) {
                            e.preventDefault();
                            if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                                fnDraw(oSettings);
                            }
                        };

                        $(nPaging).addClass('').append(
                            '<ul class="pagination pull-right">' +
                            '<li class="prev disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>' +
                            '<li class="next disabled"><a href="#"><i class="fa fa-angle-double-right"></i></a></li>' +
                            '</ul>'
                        );
                        var els = $('a', nPaging);
                        $(els[0]).bind('click.DT', {
                            action: "previous"
                        }, fnClickHandler);
                        $(els[1]).bind('click.DT', {
                            action: "next"
                        }, fnClickHandler);
                    },

                    "fnUpdate": function(oSettings, fnDraw) {
                        var iListLength = 5;
                        var oPaging = oSettings.oInstance.fnPagingInfo();
                        var an = oSettings.aanFeatures.p;
                        var i, ien, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                        if (oPaging.iTotalPages < iListLength) {
                            iStart = 1;
                            iEnd = oPaging.iTotalPages;
                        } else if (oPaging.iPage <= iHalf) {
                            iStart = 1;
                            iEnd = iListLength;
                        } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                            iStart = oPaging.iTotalPages - iListLength + 1;
                            iEnd = oPaging.iTotalPages;
                        } else {
                            iStart = oPaging.iPage - iHalf + 1;
                            iEnd = iStart + iListLength - 1;
                        }

                        for (i = 0, ien = an.length; i < ien; i++) {
                            // Remove the middle elements
                            $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                            // Add the new list items and their event handlers
                            for (j = iStart; j <= iEnd; j++) {
                                sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                                $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                                    .insertBefore($('li:last', an[i])[0])
                                    .bind('click', function(e) {
                                        e.preventDefault();
                                        oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                        fnDraw(oSettings);
                                    });
                            }

                            // Add / remove disabled classes from the static elements
                            if (oPaging.iPage === 0) {
                                $('li:first', an[i]).addClass('disabled');
                            } else {
                                $('li:first', an[i]).removeClass('disabled');
                            }

                            if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                                $('li:last', an[i]).addClass('disabled');
                            } else {
                                $('li:last', an[i]).removeClass('disabled');
                            }
                        }
                    }
                }
            });


            /*
             * TableTools Bootstrap compatibility
             * Required TableTools 2.1+
             */

            // Set the classes that TableTools uses to something suitable for Bootstrap
            $.extend(true, $.fn.DataTable.TableTools.classes, {
                "container": "DTTT ",
                "buttons": {
                    "normal": "btn btn-white",
                    "disabled": "disabled"
                },
                "collection": {
                    "container": "DTTT_dropdown dropdown-menu",
                    "buttons": {
                        "normal": "",
                        "disabled": "disabled"
                    }
                },
                "print": {
                    "info": "DTTT_print_info modal"
                },
                "select": {
                    "row": "active"
                }
            });

            // Have the collection use a bootstrap compatible dropdown
            $.extend(true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                    "container": "ul",
                    "button": "li",
                    "liner": "a"
                }
            });


            /* Table initialisation */
            $(document).ready(function() {
                var responsiveHelper = undefined;
                var breakpointDefinition = {
                    tablet: 1024,
                    phone: 480
                };
                var tableElement = $('#example');

                tableElement.dataTable({
                    "sDom": "<'row'<'col-md-6'l T><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
                    "oTableTools": {
                        "aButtons": [{
                            "sExtends": "collection",
                            "sButtonText": "<i class='fa fa-cloud-download'></i>",
                            "aButtons": ["csv", "xls", "pdf", "copy"]
                        }]
                    },
                    "sPaginationType": "bootstrap",
                    "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }],
                    "aaSorting": [
                        [1, "asc"]
                    ],
                    "oLanguage": {
                        "sLengthMenu": "_MENU_ ",
                        "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries"
                    },
                    bAutoWidth: false,
                    fnPreDrawCallback: function() {
                        // Initialize the responsive datatables helper once.
                        if (!responsiveHelper) {
                            //responsiveHelper = new ResponsiveDatatablesHelper(tableElement, breakpointDefinition);
                        }
                    },
                    fnRowCallback: function(nRow) {
                        //responsiveHelper.createExpandIcon(nRow);
                    },
                    fnDrawCallback: function(oSettings) {
                        //responsiveHelper.respond();
                    }
                });

                $('#example_wrapper .dataTables_filter input').addClass("input-medium "); // modify table search input
                $('#example_wrapper .dataTables_length select').addClass("select2-wrapper col-md-12"); // modify table per page dropdown



                $('#example input').click(function() {
                    $(this).parent().parent().parent().toggleClass('row_selected');
                });


                /*
                 * Insert a 'details' column to the table
                 */
                var nCloneTh = document.createElement('th');
                var nCloneTd = document.createElement('td');
                nCloneTd.innerHTML = '<i class="fa fa-plus-circle"></i>';
                nCloneTd.className = "center";

                $('#example2 thead tr').each(function() {
                    this.insertBefore(nCloneTh, this.childNodes[0]);
                });

                $('#example2 tbody tr').each(function() {
                    this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
                });

                /*
                 * Initialse DataTables, with no sorting on the 'details' column
                 */
                var oTable = $('#example2').dataTable({
                    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
                    "aaSorting": [],
                    "oLanguage": {
                        "sLengthMenu": "_MENU_ ",
                        "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries"
                    },
                });


                $("div.toolbar").html('<div class="table-tools-actions"><button class="btn btn-primary" style="margin-left:12px" id="test2">Add</button></div>');


                $('#example2_wrapper .dataTables_filter input').addClass("input-medium ");
                $('#example2_wrapper .dataTables_length select').addClass("select2-wrapper col-md-12");

                /* Add event listener for opening and closing details
                 * Note that the indicator for showing which row is open is not controlled by DataTables,
                 * rather it is done here
                 */
                $('#example2 tbody td i').on('click', function() {
                    var nTr = $(this).parents('tr')[0];
                    if (oTable.fnIsOpen(nTr)) {
                        /* This row is already open - close it */
                        this.removeClass = "fa fa-plus-circle";
                        this.addClass = "fa fa-minus-circle";
                        oTable.fnClose(nTr);
                    } else {
                        /* Open this row */
                        this.removeClass = "fa fa-minus-circle";
                        this.addClass = "fa fa-plus-circle";
                        oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
                    }


                    /* Formating function for row details */
                    function fnFormatDetails(oTable, nTr) {
                        var aData = oTable.fnGetData(nTr);
                        var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
                        sOut += '<tr><td>Rendering engine:</td><td>' + aData[1] + ' ' + aData[4] + '</td></tr>';
                        sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
                        sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
                        sOut += '</table>';

                        return sOut;
                    }

                });

            });





        }
    };

    /******************************
     initialize respective scripts
     *****************************/
    $(document).ready(function() {
        ULTRA_SETTINGS.dataTablesInit();

        ULTRA_SETTINGS.pageTopBar();
        ULTRA_SETTINGS.jsTreeINIT();
        ULTRA_SETTINGS.sectionBoxActions();
        ULTRA_SETTINGS.draggablePanels();
        ULTRA_SETTINGS.viewportElement();
        ULTRA_SETTINGS.onLoadTopBar();

    });

    $(window).resize(function() {

      ULTRA_SETTINGS.loginPage();
    });

    $(window).load(function() {
    ULTRA_SETTINGS.loginPage();

    });

});
