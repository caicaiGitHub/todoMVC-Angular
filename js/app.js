(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	//创建主模块
	var app = angular.module('myApp',[]);
	//创建控制器
	app.controller('todoCont',['$scope','$location', function ($scope,$location) {

		//功能1 初始化任务 显示数组中的name属性值 ng-repeat {{item.name}}
		$scope.tasks = [//模拟任务，此数据本应该由后台提供
			{id:0,name:'JavaScript',completed:true},
			{id:1,name:'Angularjs',completed:false},
			{id:2,name:'Nodejs',completed:false},
			{id:3,name:'Seajs',completed:true},
			{id:4,name:'Commonjs',completed:true},
			{id:5,name:'Bootstrap',completed:true}
		];

		//功能2 删除任务
		//通过tasks数组中的id属性判断点击的是哪个删除键，匹配id，把id对应的项从数组中删除
		$scope.destroy = function (id) {
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.id === id){
					$scope.tasks.splice(i,1);//删除数据
					return ;
				}
			}
			//return $scope.tasks;
		}

		//功能3 添加任务
		$scope.newTask ="";
		$scope.add = function () {//在表单from中按下回车键，会自动触发提交时间，所以在form标签中添加ng-submit="add()"即可
			if(!$scope.newTask){//！空字符串= true;当新任务为空时，不能提交
				return ;
			}
			var newTaskId;//新任务的id属性属性值
			if($scope.tasks.length <= 0){//当任务全部删除时，也就是$scope.length为空时，id应该从0开始
				$scope.tasks = [];
				newTaskId = 0;
			}else{
				newTaskId = $scope.tasks[$scope.tasks.length - 1].id + 1 ;//获取新任务的id，为$scope.tasks数组最后一项的id+1
			}
			$scope.tasks.push({id : newTaskId,name:$scope.newTask,completed:false});//将新任务添加到任务数组中，默认为未完成状态
			$scope.newTask = '';//新任务添加完成后，清空输入框
			//console.log($scope.tasks.length);
			return $scope.tasks;
		}

		//功能4 编辑任务数据
		//当ng-class="{'editing':true}时为可编辑状态，此时当被双击的项的id值与当前项的id相等时，添加editing类
		$scope.editId = -1;
		$scope.edit = function (id) {
			$scope.editId = id;
		}

		//当在表单按回车键是，保存数据，其实ng-model为双向数据绑定，值已经自动保存，在此处只需要移除可编辑状态即可(editing类)
		$scope.saveTask = function () {
			$scope.editId = -1;
		}

		//功能5 切换任务是否完成的状态
		//<li ng-class="{'completed':item.completed}"></li>
		//<input ng-model="item.completed"/>

		//功能6 批量切换
		//当全选被点击的时候，所有任务在完成或未完成之间切换 也就是全部completed等于true或false
		var status = true;
		$scope.toggleAll = function () {
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				item.completed = status;
			}
			status = !status;//切换完成后，下次点击全选按钮时，completed的值与此时的值相反
		}

		//功能7 清除已完成
		$scope.clear = function () {
			//在循环中对数组进行增删时，由于数组的长度不断变化，导致遍历不全面
			//所以不能直接在for循环中操作数组长度，以下方法不可取
			/*for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.completed){
					$scope.tasks.splice(item,1);
				}
			}*/

			//创建一个空数组，用于存放completed为false的项，将数组赋值给$scope.tasks则显示未完成的任务
			var temp = [];
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(!item.completed){
					temp.push(item);
				}
			}
			$scope.tasks = temp;
		}
			//功能7.1 显示或隐藏清除按钮
		//当任务中存在已完成任务是completed=true时，显示清除按钮
		//当任务中不存在已完成任务completed=false时，隐藏清除按钮
		$scope.isShow = function () {
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.completed){
					return true;
				}
			}
			return false;
		}

		//功能8 显示未完成任务数
		$scope.count = function () {
			var sum = 0;
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(!item.completed){
					sum ++;
				}
			}
			return sum;
		}

		//功能9 切换不同状态任务的显示
		$scope.isCompleted = {};
		/*$scope.unDo = function () {
			$scope.isCompleted = {completed : false};
		};
		$scope.hadDo = function () {
			$scope.isCompleted = {completed : true};
		}*/

		$scope.loca = $location;
		console.log($scope.loca.url());
		$scope.$watch('loca.url()', function (newUrl,oldUrl) {
			switch(newUrl){
				case '/active':
					$scope.isCompleted = {completed : false};
					break;
				case '/completed':
					$scope.isCompleted = {completed : true};
					break;
				default :
					$scope.isCompleted = {};
					break;
			}
		})

	}]);
})(angular);
