const diskList = document.getElementsByTagName('disk')

/*
diskArray.forEach((disk) => {
  diskEvents(disk)
})
Not currently working. Would like to refactor toward this.
*/

var diskEvents = function () {
  for (var i = 0; i < diskList.length; i++) {
    diskList[i].addEventListener('click', selectDisk)
  }
}

var currentDisk = null

var selectDisk = function () {
  currentDisk = this
}
diskEvents()
// Adds event listeners to disks so they can be selected one at a time using the var currentDisk.

const pegList = document.getElementsByClassName('peg')

var pegEvents = function () {
  for (var i = 0; i < pegList.length; i++) {
    pegList[i].addEventListener('click', selectPegId)
  }
}

var pegId = null
var selectPegId = function () {
  pegId = this.id
  moveDisk()
}

pegEvents()
// Adds event listeners to pegs so their id can be saved in pegId for assignment.

var moveDisk = function () {
  document.getElementById(pegId).appendChild(currentDisk)
}
