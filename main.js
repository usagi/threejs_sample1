var camera
  , scene
  , renderer
  , geometry
  , materials
  , mesh
  ;

function init() {
  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = 300;
  camera.position.y = 300;
  camera.position.z = 1000;
  scene.add( camera );
  
  var load_material = function(file)
  { return new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/' + file)}); };
  
  materials = 
    [ load_material('right.png')
    , load_material('left.png')
    , load_material('top.png')
    , load_material('bottom.png')
    , load_material('front.png')
    , load_material('back.png')
    ];
  
  geometry = new THREE.CubeGeometry
    ( 200
    , 200
    , 200
    , 1
    , 1
    , 1
    , materials
    );

  mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
  //mesh.useQuaternion = true;
  scene.add( mesh );

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function animate(){
  requestAnimationFrame( animate );
  render();
}

function render(){
  renderer.render( scene, camera );
}

function rotate(x,y,z){
  var u = 90;
  var v = new THREE.Vector3(x,y,z).multiplyScalar(u);
  var q = new THREE.Quaternion().setFromEuler(v);
  var m = new THREE.Matrix4().setRotationFromQuaternion(q);
  for(var n = 0; n < mesh.geometry.vertices.length; ++n)
    m.multiplyVector3(mesh.geometry.vertices[n]);
}

window.addEventListener
  ( 'load'
  , function(){
      init();
      animate();
    }
  );

window.addEventListener
  ( 'keydown'
  , function(e){
      switch(e.keyCode){
      case 83: rotate(  0,  1,  0); break; // s
      case 87: rotate(  0, -1,  0); break; // w
      case 68: rotate(  1,  0,  0); break; // d
      case 65: rotate( -1,  0,  0); break; // a
      case 69: rotate(  0,  0, -1); break; // e
      case 81: rotate(  0,  0,  1); break; // q
      }
    }
  );

