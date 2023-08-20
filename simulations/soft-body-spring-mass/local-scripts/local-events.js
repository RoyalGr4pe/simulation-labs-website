function resetSketchEvent() {
  let numberOfJoints = Number(numberOfJointsSlider.value);
  let springConstant = Number(springConstantSlider.value);
  let jointsMass = Number(jointMassSlider.value);
  let springLength = Number(springLengthSlider.value) * pixelConversionConstant;
  let jointsRadius = Number(jointRadiusSlider.value) * pixelConversionConstant;
  let rotationAngle = (Number(startingAngleSlider.value) * Math.PI) / 180;
  
  jointsGrid = createJoints(
    numberOfJoints, 
    springLength, 
    jointsMass,
    jointsRadius,
    simulationContainer.clientWidth, 
    simulationContainer.clientHeight
  );
    
  let centreOfGrid = calculateCentreOfGrid(jointsGrid, rotationAngle);

  for (joints of jointsGrid) {
    for (joint of joints) {
      let pos = joint.getPosition();

      let matrixPositionAfterRotation = rotate2x2Matrix([[pos[0]], [pos[1]]], rotationAngle, centreOfGrid)      //calculatePositionAfterRotation(joint.getPosition(), rotationAngle, centreOfGrid);
      let positionAfterRotation = [matrixPositionAfterRotation[0][0], matrixPositionAfterRotation[1][0]]
      joint.setPosition(positionAfterRotation);
    }
  }

  springs = createSprings(jointsGrid, springConstant, springLength);
}