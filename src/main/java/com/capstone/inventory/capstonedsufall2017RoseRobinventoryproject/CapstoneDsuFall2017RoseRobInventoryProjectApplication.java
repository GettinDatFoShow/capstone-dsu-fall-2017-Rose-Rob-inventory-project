package com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.enums.ItemType;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.enums.OrgType;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.*;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.model.inventory.Item;
import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class CapstoneDsuFall2017RoseRobInventoryProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstoneDsuFall2017RoseRobInventoryProjectApplication.class, args);
	}

	@Bean
	public CommandLineRunner initializeDb(ItemRepo itemRepo, RoomRepo roomRepo, AddressRepo addressRepo, BuildingRepo buildingRepo, StudentRepo studentRepo, OrganizationRepo organizationRepo) {
		return (args) -> {
			Address address = new Address();
			addressRepo.save(address);
			Date date = new Date();
			Organization organization = new Organization("Delaware State University", address, OrgType.SCHOOL.getType());

			Building building = new Building(1, "Science Center");
			buildingRepo.save(building);
			Building building2 = new Building(1, "Education");
			buildingRepo.save(building2);
			Room room = new Room(333, "SCI", building);
			Room room2 = new Room(335, "SCI", building);
			Room room3 = new Room(331, "SCI", building);
			List<Room> rooms = new ArrayList<>();
			roomRepo.save(room);
			roomRepo.save(room2);
			roomRepo.save(room3);
			Item item = new Item(99L, ItemType.ELECTRONICS.getType(), room, date, date, date, true, 167.00, true);
			Item item1 = new Item(98L, ItemType.ELECTRONICS.getType(), room3, date, date, date, true, 131.69, true);
			Item item2 = new Item(96L, ItemType.FURNITURE.getType(), room2, date, date, date, true, 357.87, true);
			itemRepo.save(item);
			itemRepo.save(item1);
			itemRepo.save(item2);
			List<Item> items = new ArrayList<>();
			items.add(item);
			items.add(item1);
			items.add(item2);
			room.setItems(items);
			rooms.add(room);
			rooms.add(room2);
			rooms.add(room3);
			building.setRooms(rooms);
			buildingRepo.saveAndFlush(building);
			List<Building> buildings = new ArrayList<>();
			buildings.add(building);
			buildings.add(building2);
			organization.setBuildings(buildings);
			organizationRepo.save(organization);
		};
	}
}

//	Item(Long id, String type, Room room, Date addedToRoom, Date created, Boolean active, List<Detail> details)
//  Room(Integer number, String name, Building building, List<Item> items, List<Course> courses)
//  Building(Integer number, String name, List<Room> rooms, List<Department> departments, Organization organization)
//  Department(String name, List<Course> courses)
//  Course(String name, Integer crn, Integer number, Integer credits, String level, Department department)
//  Organization(String name, Address address, String type, List<Building> buildings)
//  Student(String studentId, Double gpa, String level, String year, Date creationTime, Date updatedTime, List<ExperiencePoint> experiencePoints)
//  Person(String firstName, String middleName, String lastName, String title, Date dob, List<Address> addresses, List<Detail> details, byte[] profilePic, String deviceId)
//  Employee(String firstName, String middleName, String lastName, String title, Date dob, List<Address> addresses, List<Detail> details, byte[] profilePic, String deviceId, Date dateOfHire, Date endEmployment, Boolean active)
//  ItemHistory(Item item, String action, Date date)




