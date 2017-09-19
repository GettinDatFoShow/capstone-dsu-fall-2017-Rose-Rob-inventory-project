package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.Organization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepo extends CrudRepository<Organization, Long> {

    Organization findById(Long id);
    List<Organization> findAll();

}
