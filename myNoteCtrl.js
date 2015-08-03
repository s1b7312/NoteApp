myNoteApp.controller("myNoteCtrl", function($scope) {
	$scope.note = "";
	$scope.edit = false;
	$scope.editID = -1;
	$scope.left = function() { return 100 - $scope.note.length;};
	$scope.clear = function() { $scope.note = "";};
	if(localStorage.getItem('myNotes'))
		$scope.prev = JSON.parse(localStorage.getItem('myNotes'));
	else
		$scope.prev = [];

	$scope.save = function() {
		$scope.prev.push($scope.note);
		localStorage.setItem('myNotes', JSON.stringify($scope.prev));
		$scope.note="";
	};
	$scope.deleteNote = function(id) {
		$scope.prev.splice(id,1); 
		localStorage.setItem('myNotes', JSON.stringify($scope.prev));
	}
	$scope.editNote = function(id) {
		$scope.note = $scope.prev[id];
		$scope.edit = true;
		$scope.editID = id;
	}
	$scope.saveChanges = function() {
		$scope.prev.splice($scope.editID,1); 
		$scope.prev.splice($scope.editID, 0, $scope.note);
		localStorage.setItem('myNotes', JSON.stringify($scope.prev));
		$scope.note = "";
		$scope.edit = false;
		$scope.editID = -1;
	};
	$scope.cancelEdit = function() {
		$scope.edit = false;
		$scope.note="";
		$scope.editID = -1;
	}
	$scope.isEditID = function(id) {
		return id==$scope.editID;
	}
	$scope.deleteAll = function() {
		$scope.confirm = confirm("Are you sure?");
		if($scope.confirm)
			$scope.prev.length = 0;
		localStorage.setItem('myNotes', JSON.stringify($scope.prev));
	}
});