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
    diskList[i].addEventListener('transitionend', nextTransition) // For adding the bounce animation.
    diskList[i].addEventListener('dragstart', dragFunction) // For letting users drag the disk.
    diskList[i].addEventListener('dragend', dragEndFunction) // Tells what to do on drag release.
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
/*
Adds event listeners to disks.
When clicked, they save the id of the top-most disk of their parent peg their stack in var currentDiskId.
That id is translated into its className (red, orange, yellow, green, or blue) and stored in currentDiskColor in case we need to give the user an error message.
*/

const pegList = document.getElementsByClassName('peg')

var pegEvents = function () {
  for (var i = 0; i < pegList.length; i++) {
    pegList[i].addEventListener('click', selectPegId)
  }
}

/*
Adds event listener for the pegs. When the user clicks a peg, we want to do the following:

*/

var pegChildren = null
var pegId = null
var topDiskId = null
var topDiskColor = null

var moveDisk = function () {
  document.getElementById(pegId).appendChild(currentDisk)
  drop(currentDisk) // Starts drop and bounce animation
}

/*
moveDisk is the function we will use if the move attempted is legal.
*/

var selectPegId = function () {
  pegChildren = this.children
  topDiskId = setTopDiskId()
  pegId = this.id
  if (currentDisk === null) {
  } else if (parseInt(topDiskId) >= parseInt(currentDiskId)) {
    moveDisk()
  } else {
    topDiskColor = pegChildren.namedItem(topDiskId).className
    alert(`The ${currentDiskColor} disk is too big to go on top of the ${topDiskColor} disk`)
  }
}

/*
selectPegId fires on the click event. It does the following in order:
1. Assigns values to pegChildren, topDiskId, and pegId for comparison.
topDiskId needs its own function because sometimes the peg has no children giving pegChildren a value of []. In this case, we set the value of topDiskId to be arbitrarily large.
1. If no disk is selected, do nothing
2. Else if a disk is selected, compare that disk size (currentDiskId) to the topmost disk within the peg (topDiskId defined below)
3. When currentDiskId < topDiskId we want to move the currentDisk 'into' the selected peg using moveDisk()
4. When currentDiskId > topDiskId we want to display an error message telling the user why they cannot move into that peg
*/

var setTopDiskId = function () {
  if (pegChildren.length === 0) {
    return '999999999'
  } else {
    return pegChildren[(pegChildren.length - 1)].id
  }
}

pegEvents()
// Adds event listeners to pegs so their id can be saved in pegId for assignment.

function dragFunction () {
  this.classList.add('invisible')
  console.log(this.classList)
}

function dragEndFunction () {
    this.classList.remove('invisible')
}
function drop (disk) {
  disk.classList.add('drop')
  console.log(disk.classList)
}

function nextTransition () {
  var mostRecentClass = this.classList[(this.classList.length - 1)]
  if (mostRecentClass === 'drop') {
    this.classList.add('bounce1')
  } else if (mostRecentClass === 'bounce1') {
    this.classList.add('bounce2')
  } else if (mostRecentClass === 'bounce2') {
    this.classList.add('bounce3')
  } else {
    this.classList.remove('bounce3', 'bounce2', 'bounce1', 'drop')
  }
}
