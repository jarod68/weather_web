	function toDate(date){
		date.replace(/\s/g, "T");
		date = date + " UTC";
		var result =  new Date(date);

		return result;
	}

	function computeDateForParameter(date){

		return date.getUTCFullYear()+"/"+ (date.getUTCMonth()+1) +"/" + date.getUTCDate() +" " + date.getUTCHours() +":" + date.getUTCMinutes() +":"+date.getUTCSeconds();
	}

	function computeDateForTooltips(date){

		return date.getHours() +":" + date.getMinutes();
	}

	function loadDay(day){

		var result = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "./query.php?day="+computeDateForParameter(day),
			'dataType': "json",
			'success': function (json) {
				var arr = [];
				var lim = json.length;
				for (var i = 0; i < lim; i++){
					arr.push({timestamp : toDate(json[i].timestamp), outdoor_temperature: json[i].outdoor_temperature, indoor_temp: json[i].indoor_temp, indoor_humidity: json[i].indoor_humidity, indoor_pressure: json[i].indoor_pressure });
				}
				result = arr;
			}
		});
		return result;

	}


	function loadMean(from, to){

		var result = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "./mean.php?from=" + computeDateForParameter(from)+ "&to="+computeDateForParameter(to),
			'dataType': "json",
			'success': function (json) {

				var arr = [];
				var lim = json.length;
				for (var i = 0; i < lim; i++){
					arr.push({day : toDate(json[i].day), indoor_temp_mean: json[i].indoor_temp_mean, indoor_humidity_mean: json[i].indoor_humidity_mean, indoor_pressure_mean: json[i].indoor_pressure_mean, outdoor_temperature_mean: json[i].outdoor_temperature_mean });
				}
				result = arr;
			}
		});
		return result;

	}

	var today = loadDay(new Date());

	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 31);

	var month = loadMean(yesterday, new Date());
	// "timestamp":"2014-04-01 06:00:03","indoor_temp":23,"indoor_humidity":59,"indoor_pressure":999.8,"


	$(function () {
		$("#dayTemp").dxChart({

			dataSource: today,
			type: 'stackedLine',
			commonSeriesSettings: {
				argumentField: 'timestamp'
			},
			scale: {
				valueType: "datetime"
			},
			series: [{
				name: 'outdoor_temperature',
				valueField: 'outdoor_temperature', 
				point: {
					size: '0.5'
				}
			},{
				name: 'indoor_temperature',
				valueField: 'indoor_temp', 
				point: {
					size: '0.5'
				}
			} ], valueAxis:{
				label: {
					customizeText: function () {
						return this.valueText + '&#176C';
					}
				}
			},
			argumentAxis: {
				argumentType: 'datetime',
				label: {
					format: 'HH:mm'
				},
				axisDivisionFactor: 50,
				grid: {
					visible: true
				}
			},  tooltip: {
				enabled: true,
				customizeText: function (label) {

					return  this.valueText + '&#176C, ' + computeDateForTooltips(new Date(this.argumentText)) ;
				}
			}

		});
	});

	$(function () {
		$("#dayPress").dxChart({

			dataSource: today,
			type: 'stackedLine',
			commonSeriesSettings: {
				argumentField: 'timestamp'
			},
			scale: {
				valueType: "datetime"
			},
			series: [{
				name: 'indoor_pressure',
				valueField: 'indoor_pressure', 
				color: 'orange', 
				point: {
					size: '0.5'
				}
			}], valueAxis:{
				label: {
					customizeText: function () {
						return this.valueText + 'hPa';
					}
				}
			},
			argumentAxis: {
				argumentType: 'datetime',
				label: {
					format: 'HH:mm'
				},
				axisDivisionFactor: 50,
				grid: {
					visible: true
				}
			},  tooltip: {
				enabled: true,
				customizeText: function (label) {

					return  this.valueText + 'hPa, ' + computeDateForTooltips(new Date(this.argumentText)) ;
				}
			}

		});
	});


	$(function () {
		$("#dayHum").dxChart({

			dataSource: today,
			type: 'stackedLine',
			commonSeriesSettings: {
				argumentField: 'timestamp'
			},
			scale: {
				valueType: "datetime"
			},
			series: [{
				name: 'indoor_humidity',
				valueField: 'indoor_humidity', 
				color: 'violet', 
				point: {
					size: '0.5'
				}
			}], valueAxis:{
				label: {
					customizeText: function () {
						return this.valueText + '%';
					}
				}
			},
			argumentAxis: {
				argumentType: 'datetime',
				label: {
					format: 'HH:mm'
				},
				axisDivisionFactor: 50,
				grid: {
					visible: true
				}
			},  tooltip: {
				enabled: true,
				customizeText: function (label) {

					return  this.valueText + '%, ' + computeDateForTooltips(new Date(this.argumentText)) ;
				}
			}

		});
	});

	$(function () {
		$("#meanTemp").dxChart({

			dataSource: month,
			type: 'bar',
			commonSeriesSettings: {
				argumentField: 'day'
			},
			scale: {
				valueType: "datetime"
			},

			series: [{
				name: 'outdoor_temperature_mean',
				valueField: 'outdoor_temperature_mean',
				type:'bar'
			}], 
			argumentAxis: {
				argumentType: 'datetime',
				label: {
					format: 'dd/MM/yy'
				},
				axisDivisionFactor: 50,
				grid: {
					visible: true
				}
			},  tooltip: {
				enabled: true,
				customizeText: function (label) {
					var timestamp = new Date(this.argumentText);
					return  this.valueText + '&#176C, ' + timestamp.getUTCDate() + "/" + (timestamp.getUTCMonth()+1) + "/" + timestamp.getUTCFullYear() ;
				}
			}
		});
	});