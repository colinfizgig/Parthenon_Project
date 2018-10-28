	AFRAME.registerSystem('object-visible', {
	    schema: {
			//target: {type: 'selector', default: ''}
	    },

	    /**
	     * Set if component needs multiple instancing.
	     */
	    multiple: false,

	   
	    /**
	     * Called once when component is attached. Generally for initial setup.
	     */
	    init: function () {

			this.firstCheck = true;
			
			
			this.frustum = new THREE.Frustum();
			this.cameraViewProjectionMatrix = new THREE.Matrix4();
			
			this.initObject();
			this.el.addEventListener('object3dset', this.initObject.bind(this));
			
			var mainObject = this.el.object3D;

			document.querySelector('a-scene').addEventListener('loaded', function (mainObject) {
				
				  if(mainObject){
					  console.log("first Step");
					  console.log(mainObject.target);
						mainObject.target.object3D.traverse( function( child ) {
								if ( child instanceof THREE.Mesh ) {
									startScene();
								}
						});
				  }
			  })

	    },
		
		initObject: function () {
			//console.log(this.el);
		},

	    /**
	     * Called when component is attached and when component data changes.
	     * Generally modifies the entity based on the data.
	     */
	    update: function (oldData) { 
			this.mesh = this.el.getObject3D('mesh');


			if(this.mesh){
				this.mesh.traverse( function( child ) { 
					if ( child instanceof THREE.Mesh ) {
						console.log(child.isMesh);
					}
				});
			}

		},
		
		tick: function () {
			
			/*
			
			if(this.el.camera && this.firstCheck){
				console.log("true");
				
				var myCam = this.el.camera;
				
				myCam.updateMatrixWorld(); // make sure the camera matrix is updated
				myCam.matrixWorldInverse.getInverse( myCam.matrixWorld );	
				
				this.cameraViewProjectionMatrix.multiplyMatrices( myCam.projectionMatrix, myCam.matrixWorldInverse );
				
				this.frustum.setFromMatrix( this.cameraViewProjectionMatrix );
				
				console.log(this.cameraViewProjectionMatrix);
				console.log(this.frustum);
				
				var myObject = this.target1;
				console.log(myObject);
				
				this.firstCheck = false;
				//console.log( this.frustum.intersectsObject( this.data.object ) );
			}
			
			
			//console.log( this.frustum.intersectsObject(document.querySelector("#acropolis1")));
			
			
			// every time the camera or objects change position (or every frame)
			

			// frustum is now ready to check all the objects you need

			*/
			
		}

	    
	});
