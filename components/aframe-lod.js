
  AFRAME.registerPrimitive('a-lod', {

    defaultComponents: {
      lod: {}
    },
	
	mappings: {
	}
  });

  AFRAME.registerComponent('lod', {
    init: function(){
      const lod = this.lod = new THREE.LOD();
	  var myChildren = (this.el.children);
	  this.el.addEventListener('loaded', function() {
		   for (i=0; i< myChildren.length; i++) {
				const lodLevelComponent = myChildren[i].components[ 'lod-level' ];
				if( lodLevelComponent !== undefined ){
					lod.addLevel( myChildren[i].object3D, lodLevelComponent.data.level );
				}
		   }
	  });

      this.el.setObject3D( 'lod', lod );
    },
	
    tick: function(){
      if( this.el.sceneEl.camera ){
        this.lod.update( this.el.sceneEl.camera );
      }
    }
  });

  AFRAME.registerComponent('lod-level', {
    schema: {
     level: { type: 'number', default: 0}
    },
	init: function () {
		this.level = this.data.level;
	}
  });


