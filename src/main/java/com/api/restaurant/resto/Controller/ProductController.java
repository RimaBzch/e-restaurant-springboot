package com.api.restaurant.resto.Controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.restaurant.resto.Repository.ImageRepository;
import com.api.restaurant.resto.Repository.ProductRepository;
import com.api.restaurant.resto.beans.Categorie;
import com.api.restaurant.resto.beans.ImageModel;
import com.api.restaurant.resto.beans.Product;
import com.api.restaurant.resto.beans.Repas;
import com.api.restaurant.resto.service.CategorieService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/product")
public class ProductController {

	@Autowired
	ImageRepository imageRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	private CategorieService catSer;
	

	public ProductController(CategorieService catSer) {
		this.catSer = catSer;
	}

	@PostMapping("/upload")
	public String saveProduct(@RequestBody MultipartFile file, @RequestParam(name = "data") String data)
			throws IOException {
		
		try {
			System.out.println("Original Image Byte Size - " + file.getBytes().length);
			System.out.println("data "+ data);
			ObjectMapper objectMapper = new ObjectMapper();
			Product prod = objectMapper.readValue(data, Product.class);
			System.out.println("name :"+prod.getName());
			ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
					compressBytes(file.getBytes()));
			
			Repas r = new Repas(img,prod.getName(),prod.getCategorie(),prod.getComposition(),prod.getPrice());
			
			productRepository.save(r);
		//	imageRepository.save(img);
		} catch (Exception e) {
			System.out.print("exception : " + e);
			return "{ \"success\" : \"\",\"error\" : \"Error occured , probably the picture exist already!\" }";
		}
		return "{ \"success\" : \"Product saved successfully !\",\"error\" : \"\" }";
	}

	@GetMapping(path = { "/get/categories" })
	public List<Categorie> getAllCategories() throws IOException {
		List<Categorie> lstCat = this.catSer.getAllCategories();
		return lstCat;

	}
	
	@PostMapping(value = "/delete/Categorie")
    public ResponseEntity<String> deletePost(@RequestBody String id) {

        boolean  isDeleted = this.catSer.deleteCategorieById(id);

        if (!isDeleted) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
	
	@GetMapping(path = { "/get/products" })
	public List<Repas> getAllProducts() throws IOException {
        List<Repas> listToReturn = new ArrayList<>();
        List<Repas>  listRep =  null;
        
        listRep= this.productRepository.findAll();
        
        Iterator<Repas> itLsRet = listRep.iterator();
        Repas r = null;
        while(itLsRet.hasNext())
        {
        	r = itLsRet.next();
        	r.getPicture().setPicByte(decompressBytes(r.getPicture().getPicByte()));
        	r.setCategorie(this.catSer.getCategorieByID(r.getCategorie()));
        	listToReturn.add(r);      	
        	
        }
        
        
        return listToReturn;
        
	}
	
	@GetMapping(path = { "/get/productsByCategorie/{id}" })
	public List<Repas> getAllProductsByCategorie(@PathVariable("id") String id) throws IOException {
        System.out.println("getAllProductsByCategorie id:"+id );
		List<Repas> listToReturn = new ArrayList<>();
        List<Repas>  listRep =  null;
        try 
        {
	        listRep= this.productRepository.findAll().stream().filter(rep-> rep.getCategorie().equals(id)).toList();
	        Iterator<Repas> itLsRet = listRep.iterator();
	        Repas r = null;
	        while(itLsRet.hasNext())
	        {
	        	r = itLsRet.next();
	        	r.getPicture().setPicByte(decompressBytes(r.getPicture().getPicByte()));
	        	r.setCategorie(this.catSer.getCategorieByID(r.getCategorie()));
	        	listToReturn.add(r);      	
	        	
	        }
	        
        }
        catch(Exception e)
        {
        	System.out.println("get product by categories "+e);
        }
        
        return listToReturn;
        
	}

	@GetMapping(path = { "/get/{imageName}" })
	public ImageModel getImage(@PathVariable("imageName") String imageName) throws IOException {
		final Optional<ImageModel> retrievedImage = imageRepository.findByName(imageName);
		ImageModel img = new ImageModel(retrievedImage.get().getName(), retrievedImage.get().getType(),
				decompressBytes(retrievedImage.get().getPicByte()));
		return img;
	}
	
	@PostMapping("/save/Categorie")
	public String saveCategorie(@RequestBody String categ) throws IOException {
		System.out.print("name :"+categ);
		boolean exist = this.catSer.checkIfCategorieExist(categ);
		if(categ != null && categ.length() != 0)
		{
			if(exist)
				return "{ \"success\" : \"\",\"error\" : \"Error occured , Categorie already exist!\" }";
			else 
			{
				Categorie cat = new Categorie(categ);
				this.catSer.saveCategorie(cat);
				return "{ \"success\" : \"Categorie saved sucessfully !\",\"error\" : \"\" }";
			}
		}
		else
		{
			return "{ \"success\" : \"\",\"error\" : \"Categorie empty or null !\" }";
		}
	}	
	
	
	@PostMapping("/update/Categorie")
	public String updateCategorie(@RequestBody String data) throws IOException {
		System.out.print("data :"+data);
		try
		{
			ObjectMapper objectMapper = new ObjectMapper();
			Categorie cat = objectMapper.readValue(data, Categorie.class);
			System.out.print("cat from mapper : "+cat.getId());
			Optional<Categorie> opCat = this.catSer.findById(cat.getId());
			if(opCat.get()!=null)
			{   opCat.get().setName(cat.getName());
				this.catSer.saveCategorie(opCat.get());
			}
			else
				return "{ \"success\" : \"\",\"error\" : \"Categorie doesn't exist\" }";
		}
		catch(Exception e)
		{   System.out.println("exp"+e);
			return "{ \"success\" : \"\",\"error\" : \"Error\" }";
		}
			
		return "{ \"success\" : \"Categorie saved sucessfully !\",\"error\" : \"\" }";
		
	}

	// compress the image bytes before storing it in the database
	private static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
		return outputStream.toByteArray();
	}

	// uncompress the image bytes before returning it to the angular application
	private static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {

		}

		return outputStream.toByteArray();

	}
}
