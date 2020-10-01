
class SceneB extends Phaser.Scene {
    constructor() {
        super({key: "SceneB"});
    }
    init(data){
        this.data.set('CaloriasP',data);
        this.datos=this.data.get('CaloriasP');

    }
    preload(){
        this.monedasObtenidas=this.datos[0];
        this.caloriasQuemadas=this.datos[1];
        this.energiafinal=this.datos[2];
        this.segundosiniciales=this.datos[3];
        this.caloriasAquemar=this.datos[4];
        this.load.path='./assets/';
        this.load.image('fondo','FondoGimnasio.png');
        this.load.image('fondoBase','FondoBase.png');
        this.load.image('billetera','billetera.png');
        this.load.image('cronometro','cronometro.png');
        this.load.image('fr','rf.png');
        this.load.audio('fondoau','fondoson.mp3');
        this.load.audio('cuerdason','cuerda.wav');
        this.load.audio('bien','acierto.mp3');
        this.load.audio('mal','fallo.mp3');
        this.load.spritesheet('monedas','monedas.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('saltar','Saltar.png',{frameWidth:372,frameHeight:435});
        this.load.spritesheet('cuerda','cuerda.png',{frameWidth:310,frameHeight:358});
        this.caloriasP=0;
        this.segundos=0;
        this.energia=this.energiafinal;
        this.bono=1;
        this.contep=0;
        this.sal=true;
        this.rep=0;
        this.combo=0;
        this.camS=true;
        this.varcu=true;
        this.moneS=this.monedasObtenidas;

    }
    create(){

        this.Sonidofondo=this.sound.add('fondoau');
        this.cuerdason=this.sound.add('cuerdason');
        this.bien=this.sound.add('bien');
        this.mal=this.sound.add('mal');
        this.Sonidofondo.pause();
        this.Sonidofondo.volume-=0.5;
        this.Sonidofondo.totalDuration=50;
        this.Sonidofondo.play();

        this.anims.create({
            key:'cuerda_mov1',
            frames:this.anims.generateFrameNumbers('cuerda',{
                frames:[1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25]}),
            repeat:-1,
            frameRate:30
            });
            this.anims.create({
                key:'cuerda_mov2',
                frames:this.anims.generateFrameNumbers('cuerda',{
                    frames:[1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25]}),
                repeat:-1,
                frameRate:40
                });


        this.anims.create({
            key:'moned',
            frames:this.anims.generateFrameNumbers('monedas',{
                frames:[0,1,2,3,4,5]}),
            repeat:0,
            frameRate:10
            });
            
            this.anims.create({
                key:'cuerda_mov',
                frames:this.anims.generateFrameNumbers('cuerda',{
                    frames:[1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25]}),
                repeat:-1,
                frameRate:20
                });
            this.anims.create({
                key:'saltando',
                frames:this.anims.generateFrameNumbers('saltar',{
                    frames:[1,2,6,6,6,6,5,4,3,1]
                }),
                repeat:0,
                frameRate:15
                });
                this.anims.create({
                    key:'error',
                    frames:this.anims.generateFrameNumbers('saltar',{
                        frames:[7,0,7,1]
                    }),
                    repeat:0,
                    frameRate:15
                    });
                this.daniel= this.physics.add.sprite(this.sys.game.config.width/2,-20,'saltar',1);

            this.physics.world.setBoundsCollision(true,true,true,true);
        this.fond=this.add.image(this.sys.game.config.width/2,this.sys.game.config.height/2,'fondo');
        this.cuerda= this.physics.add.sprite(this.sys.game.config.width/2,300,'cuerda');
        this.billetera=this.physics.add.image(100,100,'billetera');
        this.billetera.setBounce(1);
        
        this.billetera.setCollideWorldBounds(true);
        this.cuerda.anims.play('cuerda_mov');
        //this.daniel = new Personaje(this,this.sys.game.config.width/2,0,"saltar");
        this.fondbase= this.physics.add.sprite(this.sys.game.config.width/2,400,'fondoBase');
          
        this.cuerda.setGravityY(-500);
        this.daniel.setCollideWorldBounds(true);
        this.daniel.setBounce(0);
        this.daniel.setImmovable(true);
        this.daniel.setScale(0.4);
        this.fondbase.setCollideWorldBounds(true);
        this.fondbase.setBounce(0);
        this.fondbase.ignoreGravity=true;
        this.fondbase.setGravityY(-500);
        this.fondbase.setGravityX(0);
        this.fondbase.setImmovable(true);

        //rebota a la misma intencidad
        this.moneda = this.physics.add.sprite(0,0).setScale(2);
        this.moneda.setBounce(1);
             
        this.moneda.setCollideWorldBounds(true);
        this.moneda.body.setAllowGravity(false);
        this.moneda.anims.play('moned');
       //agreando velocidad a la bola
        this.moneda.setVelocityX(500);
        this.moneda.setVelocityY(Phaser.Math.Between(-300,300));
        this.physics.add.collider(this.billetera, this.daniel,this.obtenermoneda,null,this);
        this.physics.add.collider(this.billetera, this.moneda,this.obtenermoneda,null,this);
       this.physics.add.collider(this.fondbase, this.daniel,this.chocaPala,null,this,);
        this.physics.add.collider(this.moneda,this.fondbase,this.hitSprite,null,this);
       this.physics.add.collider(this.moneda, this.daniel,this.hitSprite,null,this);
       this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
       this.cursor_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
       this.cursor_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
       this.i=0;
       this.ini=100;   
       console.log(this.ini);   
       this.tiem= new Date(); 



              //etiquetas del juego 
     
            //   let proPuntos1=this.add.text(this.sys.game.config.width/2,10,'objetivo',{
            //     fontFamily:'Arial',
            //     fontSize: 20,
            //     color: '#fff'
            // }); 
            let proPuntos3=this.add.text(this.sys.game.config.width/2-80,10,'quemar         calorias',{
                fontFamily:'Arial',
                fontSize: 20,
                color: '#fff'
            });
            
            this.proPuntos2=this.add.text(400,10,this.caloriasAquemar,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.EnergiaText=this.add.text(30,550,this.energia,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.porcentaje=this.add.text(90,550,'%',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.sus=this.add.text(10,10,'$',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.monedas=this.add.text(30,10,this.moneS,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.repnom=this.add.text(350,550,'Rep',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.repeticiones=this.add.text(410,550,this.rep,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.comnom=this.add.text(700,550,'X',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#00ff00'
            });
            this.combos=this.add.text(750,550,'1',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.calquemnom=this.add.text(680,10,'cal -',{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#00ff00'
            });
            this.caloquem=this.add.text(750,10,this.caloriasP,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#fff'
            });
            this.add.image(410,80,'fr').setScale(0.5);
            
            this.tiempo=this.add.text(395,70,this.segundos,{
                fontFamily:'Arial',
                fontSize: 30,
                color: '#000',
                backGroundColor:'#fff'
                
            });
            this.add.image(410,80,'cronometro').setScale(0.5);
//

            ////////////funciones del juego//////777
            this.input.keyboard.on("keydown_SPACE",()=>{
                if(this.sal){
                    this.sal=false;
                    this.daniel.body.setVelocityY(-100);
                    this.daniel.anims.play('saltando');
                    console.log(this.caloriasP);
                    this.energia-=3;
                    this.EnergiaText.setText(this.energia); 
                    if(this.cuerda.anims.currentFrame.index>18){
                        this.combo+=1;
                        
                        this.bien.play();
                        if(this.combo==this.bono)
                        {this.bono+=1;
                        this.combo=0};
                        this.caloriasP=this.caloriasP+this.bono;
                        this.rep++;
                        this.caloquem.setText(this.caloriasP); 
                        this.repeticiones.setText(this.rep);
                        
                    }else{
                        this.mal.play();
                        this.daniel.anims.play('error');
                        this.combo=0;
                        this.bono=1;
                        
                    }
                    this.combos.setText(this.bono);
                };
                if(this.rep==8){
                    this.cuerda.anims.play('cuerda_mov1');
                }
                if(this.rep==15){
                    this.cuerda.anims.play('cuerda_mov2');
                }
                 
            });
            
        
        
                
   
    }

    //  You still need to call `collide` in your update function, and you can still use
    //  a callback with it too, but this Signal provides for another level of notification.

    
onTap(){
    this.billetera.x=this.input.x;
    this.billetera.y=this.input.y;
}
hitSprite (){

  
};
    update(time,delta){
        console.log(this.cuerda.anims.currentFrame.index);
        if(this.tiem.getSeconds()!=new Date().getSeconds()){
            this.segundos++;
            this.tiem=new Date();
            this.tiempo.setText(50-this.segundos); 
        }
        if(this.cursor_A.isDown){
            this.daniel.x-=2;
            this.daniel.flipX=true;

        };
        if(this.cursor_D.isDown){
            this.daniel.x+=2;
            
            this.daniel.flipX=false;
        }
        if(this.cuerda.anims.currentFrame.index>6){
            this.daniel.depth=0;
            this.cuerda.depth=1;

        }
        else{
            this.daniel.depth=1;
            this.cuerda.depth=0;
            
        }
        if(this.segundos==50&&this.camS){
            this.camS=false;
            this.data1=new Array();
            this.data1[0]=this.moneS;
            this.data1[1]=this.caloriasP;
            this.data1[2]=this.energia;
            this.data1[3]=50-this.segundos;
            this.data1[4]=this.caloriasAquemar;
            this.Sonidofondo.pause();
            this.scene.start("SceneC",this.data1);
        }
        // this.Sonidofondo.pause();
            if(this.energia<1){
            this.scene.stop();
            this.data1=new Array();
            this.data1[0]=this.moneS;
            this.data1[1]=this.caloriasP;
            this.data1[2]=this.energia;
            this.data1[3]=50-this.segundos;
            this.data1[4]=this.caloriasAquemar;
            
        this.Sonidofondo.pause();
            this.scene.start("SceneC",this.data1);
        }
        if(this.cuerda.anims.currentFrame.index==1&&this.varcu){
            this.cuerdason.play();
            this.varcu=false;

        }
        if(this.cuerda.anims.currentFrame.index==5){
            this.varcu=true;
        }
       
    }
    chocaPala(){ 
        this.sal=true;
        this.daniel.setVelocityY(-15); 
        if(this.cuerda.anims.currentFrame.index==1){
                this.bono=1;
                this.daniel.anims.play('error');
                this.combos.setText(this.bono);
                this.mal.play(); 
            
        }
    }
    obtenermoneda(){
        this.moneS++;
this.monedas.setText(this.moneS);
    }
}