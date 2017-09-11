package enums;

import org.junit.Test;

import static org.junit.Assert.*;

public class OrgTypeTest {

    @Test
    public void getType() throws Exception {
        assertEquals("school", OrgType.SCHOOL.getType());
        assertEquals("business", OrgType.BUSINESS.getType());
        assertEquals("utility", OrgType.UTILITY.getType());
        assertEquals("non-profit", OrgType.NONPROFIT.getType());
    }

}