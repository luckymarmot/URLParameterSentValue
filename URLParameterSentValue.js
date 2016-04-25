var URLParameterSentValue = function() {
	this.evaluate = function() {
		var exchange = this.req.getLastExchange();
		var params = {};
		var url = exchange.requestUrl;
		var re = /\?(.*)$/;
		var m = re.exec(url);
		if(m !== null) {
			var params1 = m[1];
			var params2 = params1.split("&");
			for(var i = 0; i < params2.length; i++) {
				var currentParam = params2[i];
				var re1 = /^([^\=]*)(?:=(.*))?$/;
				var m1 = re1.exec(currentParam);
				if(m1[2] !== null) {
					params[m1[1]] = m1[2];
				} else {
					params[m1[1]] = m1[1];
				}
			}

			var parameter = this.param;
			var dv = new DynamicValue('com.luckymarmot.URLEncodingDynamicValue', {
        		'input': parameter
   			});
    		parameter = dv.getEvaluatedString();

			var sentValue = params[parameter];
			return sentValue;
		}
		else {
			return "";
		}
	}

	this.text = function(context) {
		return this.req.name + " ➤ " + this.param;
	}
}

URLParameterSentValue.identifier = "com.luckymarmot.URLParameterSentValue";

URLParameterSentValue.title = "URL Parameter Sent Value";

URLParameterSentValue.inputs = [
	InputField("req", "Source Request", "Request"),
	InputField("param", "URL Parameter", "String")
]

registerDynamicValueClass(URLParameterSentValue);