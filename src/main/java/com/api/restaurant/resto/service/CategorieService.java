package com.api.restaurant.resto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.api.restaurant.resto.Repository.CategorieRepository;
import com.api.restaurant.resto.beans.Categorie;

@Service
public class CategorieService {
	
	private CategorieRepository categRepo;
	
	public CategorieService(CategorieRepository categRepo)
	{
		this.categRepo=categRepo;
	}
	
	
	public List<Categorie> getAllCategories()
	{
		return this.categRepo.findAll();
	}
	
	public boolean deleteCategorieById(String id)
	{
		boolean deleted = false;
		try {
		 this.categRepo.deleteById(id);
		 deleted = true;
		}
		catch(Exception e)
		{
			deleted=false;
		}
		
		return deleted;
	}

	public void saveCategorie(Categorie cat)
	{
		this.categRepo.save(cat);
	}


	public boolean checkIfCategorieExist(String name) {
		return !categRepo.findAll().stream().filter(userSearch ->  
		userSearch.getName().equals(name) 
		).toList().isEmpty();
	}
	
    public String getCategorieByID(String id)
    {
    	return categRepo.findById(id).get().getName();
    }
    
    public Optional<Categorie> findById(String id)
    {
    	return categRepo.findById(id);
    }
}
