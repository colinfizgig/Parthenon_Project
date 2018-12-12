AFRAME.registerPrimitive("a-lod", {
  defaultComponents: {
    lod: {}
  },

  mappings: {}
});
// in the init, determine if scene has been loaded. when event is triggered, then
// OR make new component audio-lod
AFRAME.registerComponent("lod", {
  init: function() {
    const lod = (this.lod = new THREE.LOD());
    var myChildren = this.el.children;
    this.el.addEventListener("loaded", function() {
      for (i = 0; i < myChildren.length; i++) {
        const lodLevelComponent = myChildren[i].components["lod-level"];
        if (lodLevelComponent !== undefined) {
          lod.addLevel(myChildren[i].object3D, lodLevelComponent.data.level);
        }
      }
    });

    this.el.setObject3D("lod", lod);
    this.visibleObjects = {};
  },

  tick: function() {
    // debugger;
    if (this.el.sceneEl.camera) {
      this.lod.update(this.el.sceneEl.camera);
    }
    if (tour_stops.play("asdfa")) {
    }
    visibleObjects = this.visibleObjects;
    this.lod.children.forEach(function(childEl, i) {
      if (visibleObjects) {
        const prevVisibleIndex = visibleObjects[childEl.parent.uuid];
        if (childEl.visible && prevVisibleIndex != i) {
          this.visibleObjects[childEl.parent.uuid] = i;
          console.log(i);
          if (i === 0) {
            // when text is visible, play its tour audio
            tour_stops.play(childEl.el.id);
          } else {
            tour_stops.stop();
          }
        }
      }
    });
  }
});

AFRAME.registerComponent("lod-level", {
  schema: {
    level: { type: "number", default: 0 }
  },
  init: function() {
    this.level = this.data.level;
  }
});
