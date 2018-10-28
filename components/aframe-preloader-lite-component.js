/**
	 * Visual preloader system for A-Frame.
	 *
	 * When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
	 * of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
	 * Alternately, the modal can be manually closed
	 *
	 * Emits a 'preloading-complete' event when done.
	 */
	AFRAME.registerSystem('preloader-lite', {
	    schema: {
			scene: {type: 'selector', default: 'a-scene'},
	        bar: { type: 'selector', default: '#preloader-modal .progress-bar'}, //html class of progress bar in preloader - used to set the width
	        label: { type: 'selector', default: '#preloader-modal .progress-label'}, 
	        autoClose: { type: 'boolean', default: true}, //automatically close preloader by default - not supported if clickToClose is set to 'true'
	        clickToClose: { type: 'boolean', default: false}, //whether the user must click a button to close the modal when preloading is finished
	        closeLabelText: { type: 'string', default: 'Continue'}, //default label text of click to close button
	        title: { type: 'string', default: ''}, //title of preloader modal
	        debug: { type: 'boolean', default: false}, //whether or not to enable logging to console
	        slowLoad: { type: 'boolean', default: false}, //deliberately slow down the load progress by adding 2 second delays before updating progress - used to showcase loader on fast connections and should not be enabled in production
	        doneLabelText: { type: 'string', default: 'Done'} //text to set on label when loading is complete
	    },

	    /**
	     * Set if component needs multiple instancing.
	     */
	    multiple: false,

	    loadedAssetCount: 0, //total number of assets loaded
	    totalAssetCount: 0, //total number of assets to load
	    slowLoadTimeAssetUpdate: 1000, //length of time to slow down asset load progress if slowLoad is set to 'true'
	    slowLoadTimePreloadFinish: 4000, //length of time to slow down preload finish if slowLoad is set to 'true'

	    /**
	     * Called once when component is attached. Generally for initial setup.
	     */
	    init: function () {

	        if(this.data.debug){
	            console.log('Initialized preloader');
	        }

	        document.querySelector('a-assets').addEventListener('loaded',function(){
	            if(this.data.debug){
	                console.info('All assets loaded');
	            }
	            this.triggerProgressComplete();

	        }.bind(this));

	        var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');

	        this.totalAssetCount = assetItems.length;

	        this.watchPreloadProgress(assetItems);

	        if(this.data.disableVRModeUI){
	            this.el.setAttribute('vr-mode-ui','enabled','false');
	        }
	    },

	    /**
	     * Called when component is attached and when component data changes.
	     * Generally modifies the entity based on the data.
	     */
	    update: function (oldData) { },

	    /**
	     *
	     * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
	     */
	    watchPreloadProgress: function(assetItems){
	        for (var a = 0; a < assetItems.length; a++) {

	            var eventName;

	            switch(assetItems[a].nodeName){
	                case 'A-ASSET-ITEM':
	                    eventName = 'loaded';
	                    break;
	                case 'img':
	                    eventName = 'load';
	                    break;
	                case 'audio':
	                case 'video':
	                    eventName = 'loadeddata';
	                    break;
	            }

	            assetItems[a].addEventListener(eventName,function(e){
	                this.loadedAssetCount++;
	                if(this.data.debug) {
	                    console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
	                }
	                this.onAssetLoaded();
	            }.bind(this));
	        }
	    },

	    onAssetLoaded: function(){
	        if(this.loadedAssetCount === this.totalAssetCount){
	            this.triggerProgressComplete();
	        }else{
	            var percentage = Math.floor(this.loadedAssetCount/this.totalAssetCount*100);
	            if(this.data.slowLoad) {
	                setTimeout(function () {
						console.log(percentage);
	                    this.drawProgress(percentage);
	                }.bind(this), this.slowLoadTimeAssetUpdate)
	            }else{
					console.log(percentage);
	                this.drawProgress(percentage);
	            }
	        }
	    },

	    triggerProgressComplete: function(){

	        if(this.data.autoClose && !this.data.clickToClose){
	            if(this.data.slowLoad){
	                setTimeout(function(){
	                    this.triggerPreloadingComplete();
	                    this.closeModal();
	                }.bind(this),this.slowLoadTimePreloadFinish)
	            }else{
	                this.triggerPreloadingComplete();
	                this.closeModal();
	            }

	        }else{
	            if(this.closeBtn && this.data.clickToClose){
	                if(this.data.slowLoad){
	                    setTimeout(function(){
	                        this.closeBtn.setAttribute('style','display: inline-block');
	                    }.bind(this),this.slowLoadTimePreloadFinish)
	                }else{
	                    this.closeBtn.setAttribute('style','display: inline-block');
	                }

	            }
	        }
	    },

	    drawProgress: function(percentage){
	        //update loading bar if exists
	        if(this.data.label){
	            this.data.label.innerHTML = (percentage + "% done");
				//this.data.doneLabelText : this.data.labelText.format(percentage);
	        }

	        if(this.data.bar){
	            this.data.bar.style.width = percentage;
	        }
	    },

	    triggerPreloadingComplete: function(){
	        if(this.data.debug){
	            console.info('Preloading complete');
	        }
	        this.el.emit('preloading-complete');
			//document.getElementById("ascene").style.opacity = 1.0;
	    },

	    closeModal: function(){
	        
	    }
	});
