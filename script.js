const diskList = document.getElementsByTagName('disk')

/*
diskArray.forEach((disk) => {
  diskEvents(disk)
})
Not currently working. Would like to refactor toward this.
*/

var diskIdArray = []

function startGame () {
  document.querySelector('startButton').classList.add('recede')
  for (var i = 0; i < diskList.length; i++) {
    diskList[i].classList.remove('pregame')
  }
  for (var i = 0; i < diskList.length; i++) {
    diskIdArray.push(diskList[i].id)
  }
  diskIdArray.sort(function (a, b) { return b - a })
  for (var y = 0; y < diskIdArray.length; y++) {
    var id = diskIdArray[y]
    console.log(id)
    for (var x = 0; x < diskIdArray.length; x++) {
      if (id === diskList[x].id) {
        diskList[x].classList.add('drop')
        document.getElementById('peg1').appendChild(diskList[x])
      }
    }
  }
}
// this function makes the start button drop each disk into the first peg with the drop animation.

function diskEvents () {
  for (var i = 0; i < diskList.length; i++) {
    diskList[i].addEventListener('click', selectDisk)
    /* diskList[i].addEventListener('dragstart', dragFunction) // For letting users drag the disk.
    diskList[i].addEventListener('dragend', dragEndEvent) // Tells what to do on drag release.
    Would like to add this in later for a drag and drop capability on the disks. */
  }
}

var currentDiskColor = null
var currentDisk = null
var currentDiskId = null
var diskParentChildrenArray = null

function selectDisk () {
  diskParentChildrenArray = this.parentElement.children
  currentDiskId = diskParentChildrenArray[(diskParentChildrenArray.length - 1)].id
  currentDisk = diskParentChildrenArray.namedItem(currentDiskId)
  currentDiskColor = currentDisk.className
  currentDisk.classList.remove('drop') // keeps a disk from having both 'drop' and 'selected' classes. If a block has both, it will repeat the drop animation infinitely.
  currentDisk.classList.add('selected')
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
    // pegList[i].addEventListener('ondrop', dropHandler)
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
  pegChildren[(pegChildren.length - 1)].classList.remove('selected') // removes selected class to stop wiggling animation
  pegChildren[(pegChildren.length - 1)].classList.add('drop') // adds the drop class for the drop animation
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
    if (document.getElementById(pegId).children.length === 5 && pegId !== 'peg1') {
      alert('VICTORY!')
      document.querySelector('startButton p').innerHTML = `Can you complete the other tower? <br><b>Play Again</b>`
      document.querySelector('startButton').classList.remove('recede') // These two lines change the startButton to read 'Play again?' and brings it back up front.
    }
  } else {
    topDiskColor = pegChildren.namedItem(topDiskId).classList[0]
    alert(`The ${currentDiskColor} block is too big to go on top of the ${topDiskColor} block`)
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
    return '999999999' // arbitrarily large number so that any size block can be dropped into an empty tower.
  } else {
    return pegChildren[(pegChildren.length - 1)].id
  }
}

pegEvents()
// Adds event listeners to pegs so their id can be saved in pegId for assignment.

/*
function dragFunction () {
  this.classList.add('invisible')
  console.log(`you picked up ${this}`)
}

function dropHandler () {
  console.log('peg drop event. I can handle this - peg')
}

function dragEndEvent () {
  this.classList.remove('invisible')
}

Would like to add this in later for a drag and drop capability on the disks.
*/
