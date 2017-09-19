package enums;

import com.capstone.inventory.capstonedsufall2017RoseRobinventoryproject.enums.ItemType;
import org.junit.Test;

import static org.junit.Assert.*;

public class ItemTypeTest {

    @Test
    public void getType() throws Exception {
        assertEquals("book", ItemType.BOOK.getType());
        assertEquals("furniture", ItemType.FURNITURE.getType());
        assertEquals("electronic", ItemType.ELECTRONICS.getType());
        assertEquals("miscellaneous", ItemType.MISCELLANEOUS.getType());
    }

}