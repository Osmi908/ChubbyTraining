class SceneA extends Phaser.Scene {
    constructor() {
        super({key: "SceneA"});
    }
    

    preload(){
        this.load.path='./assets/';
        this.load.spritesheet('enter','enter.png',{frameWidth:475,frameHeight:73})
        this.load.spritesheet("fondob","puertaS.png",{frameWidth:800,frameHeight:450});
        this.load.spritesheet('piensa','DanEsp.png',{frameWidth:170,frameHeight:198});
        this.load.spritesheet('camina','Caminar1.png',{frameWidth:100,frameHeight:200});
        this.load.spritesheet('dis','DSP125.png',{frameWidth:125,frameHeight:108});
        this.load.audio('prueba','sandwich.mp3');
        this.load.image('tabla','tabla.png');
        this.load.image('escenario','FondoGimnasio.png');
        this.load.image('iniciar','iniciarE.png');
        this.load.image('space','space.png')
        this.registry.set('calorias',0);
        this.calo=0;
        this.load.audio('waw','waw.wav');
        this.load.audio('gym','gym.wav');
        this.load.audio('camina','ambiente.mp3');
        this.dat=new Date().getSeconds();
    }
    create(){
        
        this.physics.world.setBoundsCollision(true,true,true,true);
        this.inicio=0;
        let timeout=0;
        var result=0;
        // this.registry.events.on('changedata',(parent,key,data)=>{
        //     if(key=='calorias'){
        //         console.log(data);
        //     }
        // });
        // this.input.on('pointerdown',()=>{
        //     this.calo++;
        //     this.registry.set('calorias',this.calo);
        // });
        // this.data.set('energia',100);
        // this.data.set('aciertos',0);
        
        // this.data.set('monedas',300);


        // let moneda=this.add.sprite(150,150,'monedas');
        // let grupo=this.add.group();
        // grupo.add(moneda);
         const controlw=this.sys.game.config.width/2;
         const controlh=this.sys.game.config.height/2;
       

        // let graphics= this.add.graphics();
        // graphics.fillStyle(0xff3300, 1);
        // graphics.fillRect(100,200,600,300);
        // graphics.fillRect(100,100,100,100);
        // this.add.text(120,110,"A",{font: "96px Courier",fill: "#000000"});

        // this.salta=this.add.sprite(100,100,'dis')
        // this.anims.create({
        // key:'dist_saltar',
        // frames:this.anims.generateFrameNumbers('dis',{
        //     frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16]
        // }),
        // repeat:-1,
        // frameRate:10
        // });
        // this.salta.anims.play('dist_saltar');


        // let texto=this.add.text(100,100,'Hola',{
        //     color:'#c0c0c0',
        //     BackgroungColor:'#020202',
        //     pading:{
        //         top:20,
        //         bottom:20,
        //         left: 20,
        //         tight:20,
        //     }
            
        // });

        //     let score=this.add.image(controlw,controlh,'tabla').setScale(2);

        //  let proPuntos=this.add.text(controlw,controlh-50,'0',{
        //     fontFamily:'Arial',
        //     fontSize: 30,
        //     color: '#fff'
        // });
        // let proPuntos1=this.add.text(controlw-150,controlh-50,'Coints',{
        //     fontFamily:'Arial',
        //     fontSize: 30,
        //     color: '#fff'
        // });
        // let contenedor=this.add.container(0,100);
        // contenedor.add([score,proPuntos,proPuntos1]);
        
        // this.tweens.add({
        //     targets:contenedor,
        //     duration:600,
        //     y:0   
        //    });
        this.waw=this.sound.add('waw',{loop:false,pauseOnBlur:false});
        this.Sonidocamina=this.sound.add('camina',{loop:true,pauseOnBlur:false});
        let fondo=this.add.sprite(380,300,"fondob",frames=4);
        let sde=this.add.sprite(50,380,'camina');
        this.ini=this.add.image(controlw,controlh,'iniciar');
        this.sal=this.add.image(controlw,controlh+50,'space');
        this.anims.create({
        key:'dist_camina',
        frames:this.anims.generateFrameNumbers('camina',{
            frames:[0,1,2,3,4]
        }),
        repeat:-1,
        frameRate:10
        });
        this.anims.create({
            key:'enter_mov',
            frames:this.anims.generateFrameNumbers('enter',{
                frames:[0,1]
            }),
            repeat:-1,
            frameRate:2
            });
        this.anims.create({
            key:'efec_puerta',
            frames:this.anims.generateFrameNumbers('fondob',{
                frames:[0,1,2,3,4]
            }),
            repeat:0,
            frameRate:5
            });
        this.anims.create({
        key:'dist_piensa',
        frames:this.anims.generateFrameNumbers('piensa',{
            frames:[0,1,2,3,3,2,3,3,2,3,2,1]
        }),
        repeat:0,
        frameRate:5,
        
        });
        
        this.contenedorPer=this.add.container(0,0);
        this.contenedorPer.width=170;
        this.contenedorPer.height=200;
           this.contenedorPer.add([sde]);
           this.input.keyboard.on("keydown_LEFT",()=>{
            sde.flipX=false;
            sde.anims.play('dist_camina',true);
           this.contenedorPer.x=this.contenedorPer.x-5;
         Sonidocamina.play();
        });          
         this.input.keyboard.on("keydown_RIGHT",()=>{
            sde.flipX=true;
            this.contenedorPer.x=this.contenedorPer.x+5;
            sde.anims.play('dist_camina',true); 

            Sonidocamina.play();
        });
        
           this.input.keyboard.on("keyup_RIGHT",()=>{
               
               console.log("holi"); 
               sde.anims.stop('dist_camina');
               
           });
           this.contenedorPer=this.add.container(0,100);
           this.contenedorPer.add([sde]);
           this.input.keyboard.on("keyup_LEFT",()=>{
            sde.anims.stop('dist_camina'); 
         
        });
        

            //fin caminar
            //Inicio
            
            result=60-new Date().getSeconds();

        let audio=this.sound.add('gym',{loop:false,duration:5000});

        this.input.keyboard.on("keydown_E",()=>{
            this.ini.destroy();
            this.sal.destroy();
            sde.flipX=true;  
            console.log("empezar");
            sde.anims.play('dist_camina');
            //empieza animacion
            let timeline=this.tweens.createTimeline();
            timeline.add(  { 
                targets:this.contenedorPer,
                x:700,
                duration:10000,
                onComplete:()=> {
                    sde.anims.stop('dist_camina');
                this.Sonidocamina.stop();
                this.waw.volume+=0.5,
                this.waw.seek=3,
                // this.waw.rate+=1,

                this.waw.play();},

                onStart:()=>{
                    this.Sonidocamina.volume-=0.5
                this.Sonidocamina.play();
            }
            });
            timeline.add({
                targets:this.coentenedorPer,
                duration:2000,
                y:300,

                
            });
            
            timeline.add({
                onStart:()=>{sde.anims.play('dist_camina');
                this.Sonidocamina.play();
                // audio.play();
                sde.flipX=false;
                sde.scale=sde.scale-0.1
            },
            
                targets:this.contenedorPer,
                y:0,
                x:450,
                duration:4200,
                onComplete:()=> {
                   
                    sde.anims.stop('dist_camina');
                sde.anims.frameRate=10;
                },
            });
            timeline.add({
                onStart:()=>{ let piensa=this.add.sprite(50,380,'piensa').setScale(0.8);
                this.contenedorPer.remove([sde]);
                this.contenedorPer.add([piensa]);
               piensa.anims.play('dist_piensa');
               audio.volume+=0.9;
               audio.play();}
                ,
                targets:this.contenedorPer,
                y:0,
                x:430,
                scale:0.9,
                duration:4000,

                onComplete:()=>{
                    audio.pause();
                    this.Sonidocamina.volume-=0.3
                    this.contenedorPer.visible=false;
                    fondo.anims.play('efec_puerta');

                    }
            });
            timeline.add({
                targets:this.contenedorPer,
               x:430,
                duration:2000,
                onComplete:()=>{audio.resume();this.add.image(this.sys.game.config.width/2,this.sys.game.config.height/2,"escenario").setScale(1.2);
                },
            });
            timeline.add({
                targets:this.contenedorPer,
                x:430,
                duration:8000,
                onComplete:()=>{

                    this.sde=this.add.sprite(controlh,controlw,'enter');
                    this.sde.anims.play('enter_mov')

                        
                }
            });

            timeout=new Date().getSeconds();
            timeline.play();
            this.input.keyboard.on("keydown_ENTER",()=>{
                timeline.stop();
                this.Sonidocamina.stop();
                this.scene.stop('SceneA');
                this.datos=new Array();
                this.datos[0]=100;
                this.datos[1]=0;
                this.datos[2]=100;
                this.datos[3]=50;
                this.datos[4]=80;
                this.scene.start('SceneB',this.datos);
            });



        });
       
        
           
    }


 
    /* Funcion que pone un 0 delante de un valor si es necesario */
 

    update(time,delta){
        
        var cant=60-new Date().getSeconds();
        ;
    };
}