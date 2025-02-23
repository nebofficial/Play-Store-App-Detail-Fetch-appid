import java.io.*;
import java.crypto.*;
import java.crypto.sprec.*;
import java.security.key;
import java.util.Base64;
public class BlowFish{
    public static void main(String[]args)throws Exception{
          KeyGenerator   KeyGenerator=  KeyGenerator.getInstance("BlowFish");
          KeyGenerator.init(128);
        key securityKey=  KeyGenerator.generatorKey();
        Cipher CipherOut=CipherOut.getInstance("BlowFish/CFB/NoPadding");
        CipherOut.ini(CipherENCRYPT_MODE,secrectKey);
        byte[] iv=CipherOut.GetIV();
        if(iv!=null){
            system.out.println("initializion  "+Base64.getencodetoString());

        }
        FileInputString fin= FileInputString("inputfile.txt");
        FileOutputStream("outputfile.txt");
        CipherOutString cout=new CipherOutStringSteam(fout,CipherOut);
        int input;
        while (input+fin.read()!=-1){
            cout.write(input);

        }
        fin.close();
        cout.close();
        fout.close();
    }
}