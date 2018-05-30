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
  // currentDisk = document.getElementById(topDiskId)
  console.log(currentDisk)
}
diskEvents()
// Adds event listeners to disks so they can be selected one at a time using the var currentDisk.

const pegList = document.getElementsByClassName('peg')

var pegEvents = function () {
  for (var i = 0; i < pegList.length; i++) {
    pegList[i].addEventListener('click', selectPegId)
  }
}

var topDiskId = null
var pegChildren = null
var pegId = null

/*
pegChildren[(pegChildren.length - 1)].id gives us the id value of the top-most disk on the stack
currentDisk.id gives us the id of the disk we're holding to compare to the topmost disk of the chosen peg
*/

var selectPegId = function () {
  /* if (currentDisk === null) {
    return
  } else { */
    pegId = this.id
    pegChildren = document.getElementById(pegId).children
    topDiskId = pegChildren[(pegChildren.length - 1)].id
    /* if (topDiskId < currentDisk.id) {
      console.log('error')
    } else { */
      moveDisk(pegId, currentDisk)
    }
/*  }
} */

pegEvents()
// Adds event listeners to pegs so their id can be saved in pegId for assignment.

var moveDisk = function (pegId, currentDisk) {
  document.getElementById(pegId).appendChild(currentDisk)
  pegId = null
  currentDisk = null
}
