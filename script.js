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

var currentDiskColor = null
var currentDisk = null
var currentDiskId = null
var diskParentChildrenArray = null

var selectDisk = function () {
  diskParentChildrenArray = this.parentElement.children
  currentDiskId = diskParentChildrenArray[(diskParentChildrenArray.length - 1)].id
  currentDisk = diskParentChildrenArray.namedItem(currentDiskId)
  currentDiskColor = currentDisk.className
  event.stopPropagation()
}
diskEvents()
// Adds event listeners to disks so that when clicked, they save the id of the top disk on their stack in var currentDiskId.

const pegList = document.getElementsByClassName('peg')

var pegEvents = function () {
  for (var i = 0; i < pegList.length; i++) {
    pegList[i].addEventListener('click', selectPegId)
  }
}


var pegChildren = null
var pegId = null
var topDiskId = null
var topDiskColor = null
/*
pegChildren[(pegChildren.length - 1)].id gives us the id value of the top-most disk on the stack
currentDisk.id gives us the id of the disk we're holding to compare to the topmost disk of the chosen peg
*/
var moveDisk = function () {
  document.getElementById(pegId).appendChild(currentDisk)
}

var selectPegId = function () {
  pegChildren = this.children
  topDiskId = setTopDiskId()
  pegId = this.id
  if (parseInt(topDiskId) > parseInt(currentDiskId)) {
    moveDisk()
  } else if (topDiskId === '0') {
    moveDisk()
  } else {
    topDiskColor = pegChildren.namedItem(topDiskId).className
    alert(`The ${currentDiskColor} disk is too big to go on top of the ${topDiskColor} disk`)
  }
}

var setTopDiskId = function () {
  if (pegChildren.length === 0) {
    return '0'
  } else {
    return pegChildren[(pegChildren.length - 1)].id
  }
}

/*    var preliminaryId = pegChildren[(pegChildren.length - 1)].id
  if (parseInt(preliminaryId) > 0) {
    return preliminaryId
  } else { return 1 }
} */
pegEvents()
// Adds event listeners to pegs so their id can be saved in pegId for assignment.
