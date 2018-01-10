define(['scripts/services/httpService', 'scripts/requireHelper/requireUiBootstrap', 'scripts/services/configService', 'bower_components/customUI/js/fixUI', 'bower_components/echarts/ng-echarts', 'scripts/requireHelper/requireKendo'],
    function () {
        return ['httpService','$scope', '$location','configService',
            function (httpService, $scope, $event, $location, configService) {
                //商家更多发布表头
                $scope.businTableHeader1 = [
                    {
                        name: "序号",
                        value:"RowIndex"
                    },{
                        name: "商家名称",
                        value: "USR_NAME"
                    },
                    {
                        name: "发布次数",
                        value: "PUBLIC_All"
                    }
                ];
                //商家更多匹配表头
                $scope.businTableHeader2 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "商家名称",
                        value: "USR_NAME"
                    },
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //标签更多发布表头
                $scope.businTableHeader3 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "标签名称",
                        value: "EXPRESSION_SUBCATEGORY"
                    },
                    {
                        name: "发布次数",
                        value: "PUBLIC_All"
                    }
                    ,
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //标签更多订阅表头
                $scope.businTableHeader4 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "标签名称",
                        value: "EXPRESSION_SUBCATEGORY"
                    },
                    {
                        name: "订阅次数",
                        value: "SUBSCRIBE_All"
                    }
                    ,
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //标签更多匹配表头
                $scope.businTableHeader5 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "标签名称",
                        value: "EXPRESSION_SUBCATEGORY"
                    },
                    {
                        name: "发布次数",
                        value: "PUBLIC_All"
                    },
                    {
                        name: "订阅次数",
                        value: "SUBSCRIBE_All"
                    }
                    ,
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //用户更多订阅表头
                $scope.businTableHeader8 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "用户名称",
                        value: "USR_NAME"
                    },
                    {
                        name: "订阅次数",
                        value: "SUBSCRIBE_All"
                    }
                ];
                //用户更多匹配表头
                $scope.businTableHeader9 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "用户名称",
                        value: "USR_NAME"
                    },
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //APP更多表头
                $scope.businTableHeader6 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "APP名称",
                        value: "APPLICATION_ID"
                    },
                    {
                        name: "发布次数",
                        value: "PUBLIC_All"
                    },
                    {
                        name: "订阅次数",
                        value: "SUBSCRIBE_All"
                    }
                    ,
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                //设备更多表头
                $scope.businTableHeader7 = [
                    {
                        name: "序号",
                        value: "RowIndex"
                    }, {
                        name: "设备名称",
                        value: "DEVICE_OEM"
                    },
                    {
                        name: "发布次数",
                        value: "PUBLIC_All"
                    },
                    {
                        name: "订阅次数",
                        value: "SUBSCRIBE_All"
                    }
                    ,
                    {
                        name: "匹配次数",
                        value: "MATCH_All"
                    }
                ];
                $scope.perItems = 10;    //页码显示的数量
                $scope.totalItems = 0//总数据量
                $scope.currentPage = 1;//当前页面
                $scope.numPages = 0;//页码
                $scope.maxSize = 5;//页码最多显示个数
                $scope.tabStatus = 0;//判断弹出类型
                $scope.tabTitle = "";//弹出标题
                $scope.totalCount = 1;
                $scope.order = 0;
                $scope.SubgoryOrder = 0;
                $scope.ProtraitOrder = 0
                $scope.provinceid = "";
                $scope.ispro = true;
                $scope.AppOrder = 3;
                $scope.beginTime = "2016-09-07";
                $scope.endTime = "2016-09-10";
                $scope.dataType = 0;


                //天粒度，开始时间初始值
                var ds = new Date();
                ds.setDate(ds.getDate() - 7);
                //天粒度，结束时间初始值
                var de = new Date();
                de.setDate(de.getDate() - 1);
                //天粒度，时间最小值
                var dmin = new Date();
                dmin.setDate(dmin.getDate() - 90);
                //小时粒度，开始时间初始值
                var dhs = new Date();
                dhs.setHours(dhs.getHours() - 8);

                //小时粒度，时间最小值
                var dhmin = new Date();
                dhmin.setHours(dhmin.getHours() - 72);

                //开始 年
                var startTimeYear = $("#startTimeYear").kendoDatePicker({
                    value: ds,
                    start: "decade",
                    depth: "decade",
                    format: "yyyy"
                }).data("kendoDatePicker");

                //开始 月
                var startTimeMonth = $("#startTimeMonth").kendoDatePicker({
                    value: dhs,
                    format: "yyyy-MM",
                    // defines the start view
                    start: "year",
                    // defines when the calendar should return date
                    depth: "year",
                }).data("kendoDatePicker");
                //开始 日
                var startTimeDay = $("#startTimeDay").kendoDatePicker({
                    value: ds,
                    start: "month",
                    depth: "month",
                    format: "yyyy-MM-dd"
                }).data("kendoDatePicker");

                //开始 时
                var startTimeHour = $("#startTimeHour").kendoDateTimePicker({
                    value: dhs,

                    format: "yyyy-MM-dd HH:mm"
                }).data("kendoDateTimePicker");


                //结束 年
                var endTimeYear = $("#endTimeYear").kendoDatePicker({
                    value: de,
                    start: "decade",
                    depth: "decade",
                    format: "yyyy",
                    change: endChangeYear
                }).data("kendoDatePicker");
                //结束 月
                var endTimeMonth = $("#endTimeMonth").kendoDatePicker({
                    value: de,
                    format: "yyyy-MM",
                    // defines the start view
                    start: "year",
                    // defines when the calendar should return date
                    depth: "year",
                    change: endChangeMonth
                }).data("kendoDatePicker");
                //结束 日
                var endTimeDay = $("#endTimeDay").kendoDatePicker({
                    value: de,
                    format: "yyyy-MM-dd",
                    start: "month",
                    depth: "month",
                    change: endChangeDay
                }).data("kendoDatePicker");

                //结束  小时
                var endTimeHour = $("#endTimeHour").kendoDateTimePicker({
                    value: new Date(),
                    format: "yyyy-MM-dd HH:mm",
                    change: endChangeHour
                }).data("kendoDateTimePicker");

                function endChangeYear() {
                    var times = endTimeYear.value();

                }
                function endChangeMonth() {
                    var times = endTimeMonth.value();

                }

                function endChangeDay() {
                    var times = endTimeDay.value();

                }

                function endChangeHour() {
                    var times = endTimeHour.value();
                }
                $scope.names = [{ Name: "年", ID: 3 }, { Name: "月", ID: 2 }, { Name: "日", ID: 1 }, { Name: "时", ID: 0 }];
                $scope.isTimeType0 = false;
                $scope.isTimeType2 = true;
                $scope.isTimeType1 = false;
                $scope.isTimeType3 = false;
                //时间粒度改变
                $scope.timeChanges = function () {

                    if ($scope.date_type == 3) {   //年
                        $scope.isTimeType0 = true;
                        $scope.isTimeType2 = false;
                        $scope.isTimeType1 = false;
                        $scope.isTimeType3 = false;
                    } else if ($scope.date_type == 2) {  //月
                        $scope.isTimeType1 = false;
                        $scope.isTimeType2 = false;
                        $scope.isTimeType0 = false;
                        $scope.isTimeType3 = true;
                    } else if ($scope.date_type == 1) {  //日
                        $scope.isTimeType1 = false;
                        $scope.isTimeType2 = true;
                        $scope.isTimeType0 = false;
                        $scope.isTimeType3 = false;
                    } else if ($scope.date_type == 0) {  //时
                        $scope.isTimeType1 = true;
                        $scope.isTimeType2 = false;
                        $scope.isTimeType0 = false;
                        $scope.isTimeType3 = false;
                    }
                }

                $scope.beginTime = $("#startTimeDay").val();
                $scope.endTime = $("#endTimeDay").val();
                $scope.date_type = 1;
                $scope.searchData = function () {
                    switch ($scope.date_type) {
                        case 3:
                            $scope.beginTime = $("#startTimeYear").val();
                            $scope.endTime = $("#endTimeYear").val();
                            break;
                        case 2:
                            $scope.beginTime = $("#startTimeMonth").val();
                            $scope.endTime = $("#endTimeMonth").val();
                            break;
                        case 1:
                            $scope.beginTime = $("#startTimeDay").val();
                            $scope.endTime = $("#endTimeDay").val();
                            break;
                        case 0:
                            $scope.beginTime = $("#startTimeHour").val();
                            $scope.endTime = $("#endTimeHour").val();
                            break;
                    }
                    getBusin(false);
                    getSubgory(false);
                    getProtrait(false);
                    getAppSubgory(false);
                }
                getBusin(false);
                getSubgory(false);
                getProtrait(false);
                getAppSubgory(false);
                //查询商家
                function getBusin(status) {
                    if (!status)
                        $scope.businData = [];
                    httpService.get("LTED", "DmBusinService", "getBusin", {provinceid:$scope.provinceid,ispro:$scope.ispro, beginTime: $scope.beginTime, endTime: $scope.endTime, date_type: $scope.dataType, order: $scope.order, page: $scope.currentPage, pagesize: $scope.perItems }).then(function (data) {
                        var d = data.Items;
                        $scope.totalItems = data.TotalCount;//总数据量
                        $scope.totalCount = Math.ceil(data.TotalCount / $scope.perItems);
                        if (!status) {
                            $scope.businData = d;

                            $scope.businData = $scope.businData.slice(0, 6);
                            if (screen.height <= 768) {
                                $scope.businData = $scope.businData.slice(0, 2);
                            }
                            if (768 < screen.height && screen.height <= 900) {
                                $scope.businData = $scope.businData.slice(0, 4);
                            }

                        }
                        $scope.businDataAll = d;

                    });
                }
                //查询标签
                function getSubgory(status) {
                    if (!status)
                        $scope.SubgoryData = [];
                    httpService.get("LTED", "DmBusinService", "getSubgory", { provinceid: $scope.provinceid, ispro: $scope.ispro, beginTime: $scope.beginTime, endTime: $scope.endTime, date_type: $scope.dataType, order: $scope.SubgoryOrder, page: $scope.currentPage, pagesize: $scope.perItems }).then(function (data) {
                        var d = data.Items;
                        $scope.totalItems = data.TotalCount;//总数据量
                        $scope.totalCount = Math.ceil(data.TotalCount / $scope.perItems);
                        console.log($scope.totalCount);
                        if (!status) {
                            $scope.SubgoryData = d;
                            $scope.SubgoryData = $scope.SubgoryData.slice(0, 6);
                            if (screen.height <= 768) {
                                $scope.SubgoryData = $scope.SubgoryData.slice(0, 2);
                            }
                            if (768 < screen.height && screen.height <= 900) {
                                $scope.SubgoryData = $scope.SubgoryData.slice(0, 4);
                            }
                        }

                        $scope.businDataAll = d;

                    });
                }
                //查询用户
                function getProtrait(status) {
                    if (!status)
                        $scope.ProtraitData = [];
                    httpService.get("LTED", "DmBusinService", "getProtrait", { provinceid: $scope.provinceid, ispro: $scope.ispro, beginTime: $scope.beginTime, endTime: $scope.endTime, date_type: $scope.dataType, order: $scope.ProtraitOrder, page: $scope.currentPage, pagesize: $scope.perItems }).then(function (data) {
                        var d = data.Items;
                        $scope.totalItems = data.TotalCount;//总数据量
                        $scope.totalCount = Math.ceil(data.TotalCount / $scope.perItems);
                        if (!status) {
                            $scope.ProtraitData = d;
                            $scope.ProtraitData = $scope.ProtraitData.slice(0, 6);
                            if (screen.height <= 768) {
                                $scope.ProtraitData =$scope.ProtraitData.slice(0, 2);
                            }
                            if (768 < screen.height && screen.height <= 900) {
                                $scope.ProtraitData = $scope.ProtraitData.slice(0,4);
                            }
                        }
                        $scope.businDataAll = d;

                    });
                }
                //查询设备
                function getApp(status) {
                    if (!status)
                        $scope.AppData = [];
                    httpService.get("LTED", "DmBusinService", "getApp", { provinceid: $scope.provinceid, ispro: $scope.ispro, beginTime: $scope.beginTime, endTime: $scope.endTime, date_type: $scope.dataType, order: $scope.AppOrder, page: $scope.currentPage, pagesize: $scope.perItems }).then(function (data) {
                        var d = data.Items;
                        $scope.totalItems = data.TotalCount;//总数据量
                        $scope.totalCount = Math.ceil(data.TotalCount / $scope.perItems);
                        if (!status) {
                            $scope.AppData = d;
                            $scope.AppData = $scope.AppData.slice(0, 6);
                        }
                        $scope.businDataAll = d;

                    });
                }
                //查询AppperItems
                function getAppSubgory(status) {
                    if (!status)
                        $scope.AppSubgoryData = [];
                    httpService.get("LTED", "DmBusinService", "getSubgory", { provinceid: $scope.provinceid, ispro: $scope.ispro, beginTime: $scope.beginTime, endTime: $scope.endTime, date_type: $scope.dataType, order: $scope.AppOrder, page: $scope.currentPage, pagesize: $scope.perItems }).then(function (data) {
                        var d = data.Items;
                        $scope.totalItems = data.TotalCount;//总数据量
                        $scope.totalCount = Math.ceil(data.TotalCount / $scope.perItems);
                        if (!status) {
                            $scope.AppSubgoryData = d;
                            $scope.AppSubgoryData = $scope.AppSubgoryData.slice(0, 6);
                            if (screen.height <= 768) {
                                $scope.AppSubgoryData = $scope.AppSubgoryData.slice(0,2);
                            }
                            if (768 < screen.height && screen.height <= 900) {
                                $scope.AppSubgoryData = $scope.AppSubgoryData.slice(0, 4);
                            }
                        }
                        $scope.businDataAll = d;

                    });
                }

                //点击标签更多
                $scope.showSubgoryAllData = function () {
                    $scope.tabTitle = "标签排行";
                    $scope.tabclass = "icon01";
                    $scope.tabStatus = 1;
                    if ($scope.SubgoryOrder == 0) {
                        $scope.businTableHeader = $scope.businTableHeader3;
                    } else if ($scope.SubgoryOrder == 1) {
                        $scope.businTableHeader = $scope.businTableHeader4;
                    } else {
                        $scope.businTableHeader = $scope.businTableHeader5;
                    }
                    getSubgory(true);
                }
                //点击商家更多
                $scope.showBusinAllData = function () {
                    $scope.tabTitle = "商家排行";
                    $scope.tabclass = "icon02";
                    $scope.tabStatus = 0;
                    if ($scope.order == 0) {
                        $scope.businTableHeader = $scope.businTableHeader1;
                    } else {
                        $scope.businTableHeader = $scope.businTableHeader2;
                    }
                    getBusin(true);
                }
                //点击用户更多
                $scope.showProtraitAllData = function () {
                    $scope.tabTitle = "用户排行";
                    $scope.tabclass = "icon02";
                    $scope.tabStatus = 3;
                    if ($scope.ProtraitOrder == 0) {
                        $scope.businTableHeader = $scope.businTableHeader8;
                    } else {
                        $scope.businTableHeader = $scope.businTableHeader9;
                    }
                    getProtrait(true);
                }
                //点击App更多
                $scope.showAppAllData = function () {

                    $scope.tabTitle = "用户排行";
                    $scope.tabclass = "icon02";
                    $scope.tabStatus = 2;
                    if ($scope.AppOrder == 3) {
                        $scope.businTableHeader = $scope.businTableHeader6;
                    } else {
                        $scope.businTableHeader = $scope.businTableHeader7;
                    }
                    if ($scope.AppOrder == 3) {
                        getAppSubgory(true);
                    } else {
                        getApp(true);
                    }

                }
                $scope.exportExcel = function () {

                }
                $scope.pageChanged = function (page, pageCount) {
                    $scope.currentPage = page;//当前页面
                    if ($scope.tabStatus == 0) {
                        getBusin(true);
                    } else if ($scope.tabStatus == 1) {
                        getSubgory(true);
                    } else if ($scope.tabStatus == 3) {
                        getProtrait(true);
                    } else if ($scope.tabStatus == 2) {
                        if ($scope.AppOrder == 3) {
                            getAppSubgory(true);
                        } else {
                            getApp(true);
                        }
                    }

                };
                //$('#mymodal').modal('show')

                //点击菜单显示或者隐藏
                $scope.processHide=false;
                $scope.populationShow=true;
                $scope.clickSwitch = function () {
                    $scope.currentPage = 1;//当前页面
                    $scope.order = 0;
                    getBusin(false);
                    $scope.processHide=false;
                    $scope.populationShow=true;
                }
                $scope.clickProcess = function () {
                    $scope.currentPage = 1;//当前页面
                    $scope.order = 1;
                    getBusin(false);
                    $scope.processHide=true;
                    $scope.populationShow=false;
                }
                //APP点击菜单显示或者隐藏
                $scope.processHide2=false;
                $scope.populationShow2=true;
                $scope.clickSwitch2 = function () {
                    $scope.AppOrder = 3;
                    $scope.currentPage = 1;//当前页面
                    getAppSubgory(false);
                    $scope.processHide2=false;
                    $scope.populationShow2=true;
                }
                $scope.clickProcess2 = function () {
                    $scope.AppOrder = 0;
                    $scope.currentPage = 1;//当前页面
                    getApp(false);
                    $scope.processHide2=true;
                    $scope.populationShow2=false;
                }
                //APP点击菜单显示或者隐藏
                $scope.processHide3=false;
                $scope.populationShow3=true;
                $scope.clickSwitch3 = function () {
                    $scope.ProtraitOrder = 0;
                    $scope.currentPage = 1;//当前页面
                    getProtrait(false);
                    $scope.processHide3=false;
                    $scope.populationShow3=true;
                }
                $scope.clickProcess3 = function () {
                    $scope.ProtraitOrder = 1;
                    $scope.currentPage = 1;//当前页面
                    getProtrait(false);
                    $scope.processHide3=true;
                    $scope.populationShow3=false;
                }
                //标签排行
                $scope.processHide1=false;
                $scope.populationShow1=true;
                $scope.population1=false;
                $scope.clickSwitch1 = function () {
                    $scope.SubgoryOrder = 0;
                    $scope.currentPage = 1;//当前页面
                    getSubgory(false);
                    $scope.processHide1=false;
                    $scope.populationShow1=true;
                    $scope.population1=false;
                }
                $scope.clickProcess1 = function () {
                    $scope.SubgoryOrder = 1;
                    $scope.currentPage = 1;//当前页面
                    getSubgory(false);
                    $scope.processHide1=true;
                    $scope.populationShow1=false;
                    $scope.population1=false;
                }
                $scope.clicklabel1 = function () {
                    $scope.SubgoryOrder = 2;
                    $scope.currentPage = 1;//当前页面
                    getSubgory(false);
                    $scope.processHide1=false;
                    $scope.populationShow1=false;
                    $scope.population1=true;
                }
                //地图
                $scope.dtbegin = "2016-05-03";
                $scope.dtend = "2016-10-01";
                $scope.datetype = "0";
                $scope.provinceid = "";
                $scope.regionid = "";
                $scope.mapType = "china";
                $scope.isShowBntGoBack = false;

                ////省市地图
                var loadText = "'数据加载中...";
                var effects = "whirling";
                //// 2.配置图表参数:样式,加载效果,事件

                //初始化地图begin
                //控制地图
                $scope.controlMap = function (maptype, datas) {
                    $scope.mapOption = {
                        title: {},
                        tooltip: { trigger: 'item' },
                        legend: { orient: 'vertical', x: 'left', data: [''] },
                        dataRange: {
                            show: false,
                            title: { text: "" },
                            x: 'left',
                            y: 'bottom',
                            splitList: [{ start: 0, end: 1000000000, label: '(0,50]' }],
                            color: ['blue']
                        },
                        series: [
                            {
                                mapLocation:{x:'center',y:'20%'},name: '', type: 'map', mapType: maptype, selectedMode: 'single', roam: true, scaleLimit: { max: 3, min: 1 }, itemStyle: {
                                normal: { areaStyle: { color: 'transparent' }, label: { show: true }, borderColor: 'rgba(100,149,237,1)', borderWidth: 0.5 }, emphasis: { label: { show: true } }, color: 'red'
                            },
                                data: datas
                            }
                        ]
                    };
                }
                //初始化数据
                $scope.InitData = function () {
                    // $scope.controlMap("china",[]);
                    $scope.GetAppData($scope.provinceid, $scope.mapType);
                }

                $scope.GetAppData = function () {
                    $scope.getMapProvince(function (data) {
                        var datas = [];
                        for (var i = 0; i < data.length; i++) {
                            var tmp = { name: data[i].PROVINCE_DESC, areaid: data[i].PROVINCE_ID };
                            datas.push(tmp);
                        }
                        $scope.controlMap("china", datas);
                    });
                }
                $scope.InitData();
                $scope.mapConfig = {
                    // 按需加载图表,根据需要可添加多个
                    chartList: ['map'],
                    //样式, theme没有将使用缺省样式
                    theme: 'red',
                    loadingOption: {
                        text: loadText,
                        effect: effects,
                        textStyle: {
                            fontSize: 20
                        },
                    },
                    // 数据装载状态, false未加载,true已加载完毕
                    dataLoaded: true,
                    // 绑定事件,允许同时绑定多个事件
                    event: [{ click: onClick }],
                };
                $scope.controlMap("china", []);
                //地图返回
                $scope.bntGoBack = function () {
                    $scope.isShowCity = false;
                    $scope.isShowBntGoBack = false;
                    $scope.provinceid = "";
                    $scope.regionid = "";
                    $scope.mapType = "china";
                    $scope.GetAppData($scope.provinceid, $scope.mapType);
                    getBusin(false);
                    getSubgory(false);
                    getProtrait(false);
                    getAppSubgory(false);
                }
                function onClick(param) {
                    $scope.$apply(function () {
                        if ($scope.provinceid == "")//全国级别
                        {

                            $scope.ispro = true;
                            $scope.provinceid = param.data.areaid;
                            $scope.curCityName = param.data.name;
                            $scope.isShowBntGoBack = true;
                            if ($scope.provinceid == null)
                                $scope.provinceid = "";
                            $scope.mapType = param.data.name;
                            $scope.isShowCity = true;
                            $scope.getMapRegion($scope.provinceid, function (data) {
                                var datas = [];
                                for (var i = 0; i < data.length; i++) {
                                    var tmp = { name: data[i].REGION_DESC, areaid: data[i].REGION_ID };
                                    datas.push(tmp);
                                }
                                $scope.controlMap($scope.mapType, datas);
                                //$scope.GetAppData($scope.provinceid, $scope.mapType);

                                getBusin(false);
                                getSubgory(false);
                                getProtrait(false);
                                getAppSubgory(false);
                            });

                        }
                        else//省级的
                        {

                            $scope.ispro = false;
                            $scope.provinceid = param.data.areaid;
                            if ($scope.provinceid != null) {
                                getBusin(false);
                                getSubgory(false);
                                getProtrait(false);
                                getAppSubgory(false);
                            }
                            //alert($scope.regionid);
                        }
                    });
                }

                //wangyanzhen
                //页面样式的调整
                if ( screen.height <= 768) {
                    $(".orderbottom").css("height", "60%");

                }
                if (768 < screen.height && screen.height <= 960) {
                    $(".orderbottom").css("height", "76%");

                }
                if (screen.height <= 1024) {
                    $(".centimer").css({ height: '68px' });
                    $(".centimer").css({ bottom: '0%' });
                    $("body").css("fontSize", "13px");
                    $("table").addClass("table-condensed");
                    $(".centimer h5").css("fontSize", "13px");
                    $(".searchLeftId label").css("fontSize", "13px");
                    $(".zhi").css("fontSize", "13px");

                    $(".timerHeader").height(30);

                    $(".ordermapInTop .nav>li>a").css("padding-left", "8px");
                    $(".ordermapInTop .nav>li>a").css("padding-right", "8px");

                    $(".centimer .searchLeftId select").css("height", "34px");

                }

            }]
    });