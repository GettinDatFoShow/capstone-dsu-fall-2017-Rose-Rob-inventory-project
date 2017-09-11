package repository;

import model.inventory.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo extends CrudRepository<Item, Long> {
}
