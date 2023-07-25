// define the enumerator for dropdown menu on the block
// enum SIZE {1,2}

//% color="#52c3f0" iconWidth=40 iconHeight=40
namespace mpu6050 {
    //% block="initialize the module" blockType="command"
    export function moduleInit(parameter: any, block: any){
        Generator.addInclude('Adafruit_MPU6050', '#include <Adafruit_MPU6050.h>', true);
        Generator.addInclude('Adafruit_Sensor', '#include <Adafruit_Sensor.h>', true);
        Generator.addInclude('Wire', '#include <Wire.h>', true);
        Generator.addInclude('Math', '#include <Math.h>', true);
        Generator.addObject('mpu', 'Adafruit_MPU6050', 'mpu;', true);
        Generator.addObject('errorVariables', 'float', 'accXError, accYError, accZError, gyroXError, gyroYError, gyroZError, tempError;', true);
        Generator.addObject('rad2Deg', 'float', 'rad2Deg = 57.295779513f;', true);
        Generator.addSetup('startSerial', 'Serial.begin(9600);\n\t'+
        'while (!Serial){\n\t'+
        '  delay(100); // will pause Zero, Leonardo, etc until serial console opens\n\t'+
        '}\n\t'+
        'Serial.println("Adafruit MPU6050 test!");\n', true);

        Generator.addSetup('initialize', '// Try to initialize!\n\t'+
        'if (!mpu.begin()) {\n\t'+
        '  Serial.println("Failed to find MPU6050 chip");\n\t'+
        '  while (1) {\n\t'+
        '      delay(10);\n\t'+
        '  }\n\t'+
        '}\n\t'+
        'Serial.println("MPU6050 Found!");\n', true);
        
        Generator.addSetup('setupAcc', '// set accelerometer unit, in this case -8g to +8g\n\t'+ 
        'mpu.setAccelerometerRange(MPU6050_RANGE_8_G);\n\t'+
        'Serial.print("Accelerometer range set to: ");\n\t'+
        'switch (mpu.getAccelerometerRange()) {\n\t'+
        'case MPU6050_RANGE_2_G:\n\t'+
        '  Serial.println("+-2G");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_4_G:\n\t'+
        '  Serial.println("+-4G");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_8_G:\n\t'+
        '  Serial.println("+-8G");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_16_G:\n\t'+
        '  Serial.println("+-16G");\n\t'+
        '  break;\n\t'+
        '}\n', true);
        
        Generator.addSetup('setupGyro', '// set gyro unit, in this case 500 degree/s\n\t'+
        'mpu.setGyroRange(MPU6050_RANGE_500_DEG);\n\t'+
        'Serial.print("Gyro range set to: ");\n\t'+
        'switch (mpu.getGyroRange()) {\n\t'+
        'case MPU6050_RANGE_250_DEG:\n\t'+
        '  Serial.println("+- 250 deg/s");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_500_DEG:\n\t'+
        '  Serial.println("+- 500 deg/s");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_1000_DEG:\n\t'+
        '  Serial.println("+- 1000 deg/s");\n\t'+
        '  break;\n\t'+
        'case MPU6050_RANGE_2000_DEG:\n\t'+
        '  Serial.println("+- 2000 deg/s");\n\t'+
        '  break;\n\t'+
        '}\n', true);

        Generator.addSetup('setupBandwidth', '// set filter bandwidth\n\t'+
        'mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);\n\t'+
        'Serial.print("Filter bandwidth set to: ");\n\t'+
        'switch (mpu.getFilterBandwidth()) {\n\t'+
        'case MPU6050_BAND_260_HZ:\n\t'+
        '  Serial.println("260 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_184_HZ:\n\t'+
        '  Serial.println("184 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_94_HZ:\n\t'+
        '  Serial.println("94 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_44_HZ:\n\t'+
        '  Serial.println("44 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_21_HZ:\n\t'+
        '  Serial.println("21 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_10_HZ:\n\t'+
        '  Serial.println("10 Hz");\n\t'+
        '  break;\n\t'+
        'case MPU6050_BAND_5_HZ:\n\t'+
        '  Serial.println("5 Hz");\n\t'+
        '  break;\n\t'+
        '}\n\t'+
        'Serial.println("");\n', true);

        Generator.addSetup('calibration', '//calibrate mpu6050\n\t'+
        '// request data\n\t'+
        'float accXSum, accYSum, accZSum, gyroXSum, gyroYSum, gyroZSum, tempSum = 0;\n\t'+
        'sensors_event_t a, g, temp;\n\t'+
        'mpu.getEvent(&a, &g, &temp);\n\t'+
        
        'for (int i = 0; i < 1000; i++){\n\t'+
        '  accXSum += a.acceleration.x;\n\t'+
        '  accYSum += a.acceleration.y;\n\t'+
        '  accZSum += a.acceleration.z;\n\t'+
        '  tempSum += temp.temperature;\n\t'+
        '  gyroXSum += g.gyro.x;\n\t'+
        '  gyroYSum += g.gyro.y;\n\t'+
        '  gyroZSum += g.gyro.z;\n\t'+
        '  delay(10); // read data every 10 ms\n\t'+
        '}\n\t'+

        'accXError = accXSum / 1000;\n\t'+
        'accYError = accYSum / 1000;\n\t'+
        'accZError = accZSum / 1000 - 9.81;\n\t'+
        'gyroXError = gyroXSum / 1000;\n\t'+
        'gyroYError = gyroYSum / 1000;\n\t'+
        'gyroZError = gyroZSum / 1000;\n\t'+
        'tempError = tempSum / 1000;\n\t'+
        'delay(100);\n', true);
    }

    //% block="get original data" blockType="command"
    export function getOriginalData(){
        Generator.addCode('// Get new sensor events with the readings\n\t'+
        'sensors_event_t a, g, temp;\n\t'+
        'mpu.getEvent(&a, &g, &temp);\n\t'+
        '// calibrate the data and store in the variables\n\t'+
        'float accX = a.acceleration.x - accXError;\n\t'+
        'float accY =  a.acceleration.y - accYError;\n\t'+
        'float accZ = a.acceleration.z - accYError;\n\t'+
        'float gyroX = g.gyro.x - gyroXError;\n\t'+
        'float gyroY = g.gyro.y - gyroYError;\n\t'+
        'float gyroZ = g.gyro.z - gyroZError;\n\t'+
        'float mpuTemp = temp.temperature - tempError;\n');
    }

    //% block="get roll" blockType="reporter"
    export function getRoll(){
        Generator.addObject('getRoll', 'float', 'getRoll(float accX, float accY, float accZ){\n\t'+
        'float mag = sqrt(pow(accX, 2) + pow(accY, 2) + pow(accZ, 2));\n\t'+
        'float magXZ = sqrt(pow(accX, 2) + pow(accZ, 2));\n\t'+
        '// direction of accY, positive or negative\n\t'+
        'int accYDir = accY/abs(accY);\n\t'+
        'int accZDir = accZ/abs(accZ);\n\t'+
        'return accYDir * acos(accZDir * magXZ / mag) * rad2Deg;\n\t'+
        '}\n', true);
        Generator.addCode('getRoll(accX, accY, accZ)');
    }

    //% block="get pitch" blockType="reporter"
    export function getPitch(){
        Generator.addObject('getPitch', 'float', 'getPitch(float accX, float accY, float accZ){\n\t'+
        'float mag = sqrt(pow(accX, 2) + pow(accY, 2) + pow(accZ, 2));\n\t'+
        'float magYZ = sqrt(pow(accY, 2) + pow(accZ, 2));\n\t'+
        '// direction of accX positive or negative\n\t'+
        'int accXDir = accX/abs(accX);\n\t'+
        'int accZDir = accZ/abs(accZ);\n\t'+
        'return accXDir * acos(accZDir * magYZ / mag) * rad2Deg;\n\t'+
        '}\n', true);
        Generator.addCode('getPitch(accX, accY, accZ)');
    }

}
